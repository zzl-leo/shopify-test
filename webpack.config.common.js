/*
 * @Date: 2022-09-27 18:09:46
 * @LastEditors: Leo
 * @LastEditTime: 2022-09-29 10:21:30
 * @FilePath: \shopify-starter-theme-master\webpack.config.common.js
 * @description: 打包公共设置
 */
const isProduction = process.env.NODE_ENV === 'production';
const shopifyStore = process.env.SHOPIFY_STORE;

const path = require('path');
const read = require('read-yaml');
const BrowserSync = require('browser-sync');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader/dist/index');
const CopyPlugin = require('copy-webpack-plugin');
const glob = require('glob');

const config = read.sync('config.yml');
const storeURL = config[shopifyStore].store;
const themeID = config[shopifyStore].theme_id;

// 遍历js打包入口，默认为js/index下所有js文件
const initEntry = () => {
    const entries = {}
    glob.sync('./src/js/index/*.js').forEach(path => {
        const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
        entries[entry] = path
    })
    return entries
}

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: initEntry(),
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[chunkhash:5].bundle.js',
        path: path.resolve(__dirname, 'theme/assets'),
    },
    optimization: {
        splitChunks: {
            automaticNameDelimiter: '-',
        },
    },
    module: {
        rules: [{
                test: /\.svelte$/,
                use: {
                    loader: 'svelte-loader',
                    options: {
                        emitCss: false
                    },
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread'],
                    },
                },
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            url: false, // Don't resolve url(), all assets end up in assets directory
                        },
                    },
                    {
                        loader: 'postcss-loader'
                    },
                ],
            },
            {
                test: /\.vue$/,
                use: [{
                    loader: 'vue-loader'
                }]
            },
        ],
    },
    stats: {
        children: false
    },
    plugins: [
        new VueLoaderPlugin(),
        new BundleAnalyzerPlugin({
            //   analyzerMode: env === 'analyze' ? 'static' : 'disabled',
            analyzerMode: 'disabled',
            reportFilename: '../../report.html',
        }),

        new CleanWebpackPlugin({
            // cleanOnceBeforeBuildPatterns: ['*.bundle.js'],
            cleanStaleWebpackAssets: false
        }),

        new MiniCssExtractPlugin({
            filename: '[name].bundle.css'
        }),

        new BrowserSyncPlugin({ // 开发预览
            https: true,
            port: 3000,
            proxy: `${storeURL}?preview_theme_id=${themeID}`,
            middleware: [
                (function mw(req, res, next) {
                    // Add url paramaters for Shopify theme preview.
                    // ?_fd=0 prevents domain forwarding, ?pb=0 hides the Shopify preview bar
                    const prefix = req.url.indexOf('?') > -1 ? '&' : '?';
                    const queryStringComponents = ['_ab=0&_fd=0&_sc=1&pb=0'];
                    req.url += prefix + queryStringComponents.join('&');
                    next();
                }),
            ],
            files: [{
                // theme-ready.tmp is touched by theme-kit after uploaded to Shopify,
                // so the browser is ready to refresh.
                match: ['theme-ready.tmp'],
                fn() {
                    BrowserSync.get('bs-webpack-plugin').reload();
                },
            }],
            // Move snippet injection to </body>,
            // Shopify content_for_header causes injection to load in head and break scripts
            snippetOptions: {
                rule: {
                    match: /<\/body>/i,
                    fn(snippet, match) {
                        return snippet + match;
                    },
                },
            },
        }, {
            reload: false
        }),
        new CopyPlugin({ // 复制公共新增theme liquid
            patterns: [{
                    from: path.resolve(__dirname, 'src/liquid/common/snippets/'),
                    to: path.resolve(__dirname, 'theme/snippets/'),
                    noErrorOnMissing: true // 处理空文件夹报错
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/sections/'),
                    to: path.resolve(__dirname, 'theme/sections/'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/layout/'),
                    to: path.resolve(__dirname, 'theme/layout/'),
                    noErrorOnMissing: true
                },
                {
                    from: path.resolve(__dirname, 'src/liquid/common/assets/'),
                    to: path.resolve(__dirname, 'theme/assets/'),
                    noErrorOnMissing: true
                }
            ]
        })
    ],
}