var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    devtool: debug ? 'source-map' : null,
    entry: './js/bible.js',
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?stage=0', exclude: /node_modules/ }
        ]
    },
    output: {
        path: './public/javascripts/',
        filename: 'main.js'
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false })
    ],
    resolve: {
        extensions: ['', '.js']
    }
};
