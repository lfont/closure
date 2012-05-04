var defaultOptions = {
        toolsDir: '.'
    },
    extend = function(a, b) {
        for (var x in b) {
            if (b.hasOwnProperty(x)) {
                a[x] = b[x];
            }
        }
    },
    stylesheets,
    plovr,
    closure = {
        setup: function(options) {
            var opts = {};
            extend(opts, defaultOptions);
            extend(opts, options);
            stylesheets = require('./stylesheet')(opts);
            plovr = require('./plovr')(opts);
            return this;
        }
    };

Object.defineProperty(closure, 'stylesheets',
    {
        get: function() {
            if (!stylesheets) {
                this.setup({});
            }

            return stylesheets;
        },
        enumerable: true
    });

Object.defineProperty(closure, 'plovr',
    {
        get: function() {
            if (!plovr) {
                this.setup({});
            }

            return plovr;
        },
        enumerable: true
    });

module.exports = closure;
