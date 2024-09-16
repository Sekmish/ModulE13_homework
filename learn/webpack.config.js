const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './index.ts',
        // color: './color.js' // Можно добавить, затем указать в бандлах
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'static')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                  MiniCssExtractPlugin.loader,
                  'css-loader'
                ]
              },
            { 
              test: /\.pug$/,
              use: ['html-loader', 'pug-html-loader']
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            },
            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            
        }),
        new HtmlWebpackPlugin({
            template: 'index.pug',
            filename: 'index.html',
            chunks: ['main'], // Какие бандлы включить
            inject: false // Это добавит/уберет ссылку на CSS автоматически
        }),
       
        new CssMinimizerPlugin({
            minimizerOptions: {
                preset: [
                    'default',
                    {
                        discardComments: { removeAll: true }, //убирает комментарии
                    },
                ],
            },
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],

    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
    },

    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'static'),
        watchContentBase: true,
    },
};