module.exports = {
    entry: './src/main.js',
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.less/,
                loader: "style-loader!css-loader!less-loader",
            },
        ]
    }
    
    // plugins: [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: '"production"'
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     })
    // ],
    
};