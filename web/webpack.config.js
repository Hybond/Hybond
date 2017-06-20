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
            },
            // {
            //     test: /\.scss$/,
            //     loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
            // },
            {
                test: /\.scss/,
                loaders: ['style-loader', 'css-loader', 'sass-loader'],
            }
        ]
    }
}
