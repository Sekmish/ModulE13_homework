const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        main: './index.ts',
        // color: './color.js' // Добавьте это
    },
    output: {
        filename: '[name].js', // Измените это
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
            chunks: ['main'], // Укажите, какие бандлы включить
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
        
    ],

    optimization: {
        minimize: true,
        minimizer: [
          new CssMinimizerPlugin(),
          new TerserPlugin()
        ],
    },
 
};