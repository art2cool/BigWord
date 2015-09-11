module.exports = {
    entry: './app/app.js',
    output: {
        path: './build',
        publicPath: '/assets/',
        filename: 'bundle.js',
        sourceMapFilename: 'bundle.map'
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
        ]
    },
    node: {
        fs: "empty"
    }
};
