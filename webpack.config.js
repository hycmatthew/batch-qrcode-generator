const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path');
const webpack = require('webpack')

const resolvePath = _path => path.resolve(__dirname, _path);

module.exports = {
    entry: resolvePath('./src/index.js'),
    output: {
        path: path.join(__dirname,'/dist'),
        filename: 'index.bundle.js'
    },
    devServer:{
        historyApiFallback: true,
        static: './dist',
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                type: 'asset/resource',
            }
        ]
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [new HtmlWebpackPlugin({
        title: "React App",
        template: path.resolve(__dirname, './src/index.html'),
        filename: 'index.html',
    }), new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()]
};