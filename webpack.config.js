const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = process.env.PORT || 3000;

const path = require('path');

function resolvePath(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: resolvePath('www'),
        filename: 'app.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    // target:'node',
    devServer: {
        hot: true,
        open: true,
        compress: true,
        port: port,
        // contentBase: '/www/',
        // watchOptions: {
        //     poll: true
        // },
        // https: true,
        // historyApiFallback: true,

        contentBase: '/www/',

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                  'css-loader',
                ],
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]'
                        }
                    }
                ]
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins:[
        // new HtmlWebpackPlugin({
        //    template: './src/index.html'
        // })
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),

    ]
};