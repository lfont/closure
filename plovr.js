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
    Plovr = function(options, input) {
        var command = 'java -jar %s';

        this.name = 'plovr';
        this.options = options;

        this.serve = function() {
            command += ' serve';
            return this;
        };

        this.build = function() {
            command += ' build';
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

util.inherits(Plovr, Tool);

module.exports = function(options) {
    return function(input) {
        return new Plovr(options, input);
    };
};
