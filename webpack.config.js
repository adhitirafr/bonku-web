const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const dotenv = require('dotenv')

function resolvePath(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        // path: path.join(__dirname, '/dist'),
        // path: path.join(__dirname, 'dist'),

        path: resolvePath('www'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        hot: true,
        port: 3000,
        // watchContentBase: true,
        contentBase: '/www/',
        historyApiFallback: true, // this prevents the default browser full page refresh on form submission and link changeS
    },
    devtool: 'cheap-module-eval-source-map', // this helps to browser to point to the exact file in the console, helps in debug
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader'
        }
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                    },
                },
            ],
        },
    ]
    },
    plugins: [
        new HtmlWebpackPlugin({ 
            template: './src/index.html' 
        }),
        new webpack.ProvidePlugin({
            "React": "react",
        }),
        // add the plugin to your plugins array
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
    ],
}