/*
 * @Date: 2022-09-27 18:24:25
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-28 14:39:24
 * @FilePath: \shopify-starter-theme-master\webpack.config.ca.js
 * @description: CA配置
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
        //   patterns: [
        //     { from: "source", to: "dest" },
        //     { from: "other", to: "public" },
        //   ],
        // }),
        new CopyPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname, 'src/liquid/ca/snippets/'),
                  to: path.resolve(__dirname, 'theme/snippets/')
                },
            ]
        })
        // new CopyPlugin([
        //     {
        //         from: 'src/liquid/ca/templates/**/*.liquid',
        //         to: 'templates/[name].[ext]',
        //     },
        //     {
        //         from: 'src/liquid/ca/snippets/**/*.liquid',
        //         to: 'snippets/[name].[ext]',
        //         flatten: true
        //     },
        //     {
        //         from: 'src/liquid/ca/sections/**/*.liquid',
        //         to: 'sections/[name].[ext]',
        //         flatten: true
        //     },
        //     {
        //         from: 'src/liquid/ca/assets/**/*',
        //         to: 'assets/[name].[ext]',
        //         flatten: true
        //     }
        // ])
    ]
})