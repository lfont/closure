var util = require('util'),
    Tool = require('./tool'),
    jar,
    exec = function(command, input, callback) {
        this.getFiles_(input, (function(error, files) {
            var cmd;

            if (error) {
                callback(error);
                return;
            }

            cmd = util.format(
                '%s %s',
                util.format(command, jar),
                files.join(' '));
            this.exec_(cmd, callback);
        }).bind(this));
    },
    Stylesheet = function(options, input) {
        var command = 'java -jar %s';

        this.name = 'closure-stylesheets';
        this.options = options;

        this.prettyPrint = function() {
            command += ' --pretty-print';
            return this;
        };

        this.outputFile = function(name) {
            command += ' --output-file ' + name;
            return this;
        };

        this.outputRenamingMap = function(name) {
            command += ' --output-renaming-map ' + name;
            return this;
        };

        this.outputRenamingMapFormat = function(format) {
            command += ' --output-renaming-map-format ' + format;
            return this;
        };

        this.rename = function(type) {
            command += ' --rename ' + type;
            return this;
        };

        this.exec = function(callback) {
            if (!jar) {
                this.getBin_((function(error, file) {
                    if (error) {
                        callback(error);
                        return;
                    }

                    jar = file;
                    exec.call(this, command, input, callback);
                }).bind(this));
            } else {
                exec.call(this, command, input, callback);
            }

            return this;
        };
    };

util.inherits(Stylesheet, Tool);

module.exports = function(options) {
    return function(input) {
        return new Stylesheet(options, input);
    };
};
