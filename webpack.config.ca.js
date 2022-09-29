/*
 * @Date: 2022-09-27 18:24:25
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 09:25:16
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
        new CopyPlugin({
            patterns: [{
                    from: path.resolve(__dirname, 'src/liquid/ca/snippets/'),
                    to: path.resolve(__dirname, 'theme/snippets/'),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/ca/sections/'),
                    to: path.resolve(__dirname, 'theme/sections/'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/ca/layout/'),
                    to: path.resolve(__dirname, 'theme/layout/'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/ca/assets/'),
                    to: path.resolve(__dirname, 'theme/assets/'),
                    noErrorOnMissing: true
                }
            ]
        })
    ]
})