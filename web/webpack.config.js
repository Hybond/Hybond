module.exports = {
    entry: './web/src/index.js',
    output: {
        filename: './web/dist/bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            }
        ]
    }
}
