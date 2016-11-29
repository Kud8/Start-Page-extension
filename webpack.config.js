'use strict';

module.exports = {
    context: __dirname + '\\js',
    entry: {
        index: ['./index'],
    },
    output: {
        path: __dirname + '\\build\\js',
        filename: '[name].js',
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /(node_modules)/,
            loader: 'babel'
        }]
    }

};