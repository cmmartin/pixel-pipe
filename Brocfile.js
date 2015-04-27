var funnel = require('broccoli-funnel');
var mergeTrees  = require('broccoli-merge-trees');
var fastBrowserify = require('broccoli-fast-browserify');
var lessCompiler = require('broccoli-less-single');

var root = 'src';

var es6 = funnel(root, { srcDir: 'scripts' });

var es5 = fastBrowserify(es6, {
    bundles: {
        "app.js": {
            transform: ['babelify'],
            entryPoints: ['main.js'],
            debug: true
        }
    }
});

var less = funnel(root, { srcDir:'styles' });

var css = lessCompiler(less, 'app.less', 'app.css');

var index = funnel(root, { files: ['index.html']});

var images = funnel(root, {
    srcDir: 'images',
    destDir: 'images'
});

module.exports = mergeTrees([es5, css, index, images]);
