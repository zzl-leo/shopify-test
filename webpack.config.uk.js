/*
 * @Date: 2022-09-27 18:24:11
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-28 15:59:38
 * @FilePath: \shopify-starter-theme-master\webpack.config.uk.js
 * @description: UK配置
 */

const {
    merge
} = require('webpack-merge');
const common = require('./webpack.config.common.js');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const caWebpackConfig = merge(common, {
    mode: 'production',
    plugins: []
})

module.exports = merge(common, {
    plugins: [
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, 'src/liquid/uk/snippets/'),
        //             to: path.resolve(__dirname, 'theme/snippets/')
        //         },
        //         {
        //             from: path.resolve(__dirname, 'src/liquid/uk/templates/'),
        //             to: path.resolve(__dirname, 'theme/templates/')
        //         },
        //         {
        //             from: path.resolve(__dirname, 'src/liquid/uk/sections/'),
        //             to: path.resolve(__dirname, 'theme/sections/')
        //         },
        //         {
        //             from: path.resolve(__dirname, 'src/liquid/uk/assets/'),
        //             to: path.resolve(__dirname, 'theme/assets/')
        //         },
        //     ]
        // })
    ]
})