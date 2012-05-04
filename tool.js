var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    util = require('util'),
    Tool = function() { };

Tool.prototype.exec_ = function(command, callback) {
    console.log('executing: ' + command);
    exec(command, (function(error, stdout, stderr) {
        console.log(util.format('%s stdout: %s', this.name, stdout));
        console.log(util.format('%s stderr: %s', this.name, stderr));
        callback(error, command, stdout, stderr);
    }).bind(this));
};

Tool.prototype.getBin_ = function(callback) {
    var toolsDir = this.options.toolsDir;
    fs.readdir(toolsDir, (function(error, files) {
        var i,
            length;

        if (error) {
            callback(error);
            return;
        }

        length = files.length;
        for (i = 0; i < length; i += 1) {
            if (files[i].indexOf(this.name) === 0) {
                callback(null, path.join(toolsDir, files[i]));
                return;
            }
        }

        callback(new Error(util.format('Tool %s was not found!', this.name)));
    }).bind(this));
};

Tool.prototype.getFiles_ = function(input, callback) {
    if (util.isArray(input)) {
        callback(null, input);
    } else {
        fs.stat(input, function(error, stats) {
            if (error) {
                callback(error);
                return;
            }

            if (stats.isDirectory()) {
                fs.readdir(input, function(error, files) {
                    var inputs = [];

                    if (error) {
                        callback(error);
                        return;
                    }

                    files.forEach(function(file) {
                        inputs.push(path.join(input, file));
                    });

                    callback(null, inputs);
                });
            } else {
                callback(null, [input]);
            }
        });
    }
};

module.exports = Tool;
