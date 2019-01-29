const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const SRC_PATH = path.resolve(__dirname, './src');
const webpack = require('webpack');
// find target dir ,fallback to orgin path
let webpackConfig = {
    devtool: "source-map",
    devServer: {
        quiet: false,
        host: '0.0.0.0',
        port: 8081
    },
    entry: {
        index: path.resolve(SRC_PATH, `./tmpl/dice/index.js`),
    },
    output: {
        path: path.join(__dirname, `./static/dice`),
        filename: '[name].[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "掷骰子",
            template: path.join(SRC_PATH, './tmpl/dice/index.html'),
            favicon: path.join(SRC_PATH, `./tmpl/dice/dice.png`)
        }),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })

    ],
    module: {
        rules: [{
            test: /\.vue$/,
            use: [{
                loader: 'vue-loader'
            }]
        }, {
            test: /\.(svg|png|jpg|gif)$/,
            use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000
                    }
                },
                {
                    loader: 'image-webpack-loader',
                    // options: {
                    //     disable: true, // webpack@2.x and newer
                    // },
                },
            ]
        }, {
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }, {
            test: /(\.scss$|\.css$|\.sass$)/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader'
            }, {
                loader: 'sass-loader'
            }]
        }]
    },
    resolve: {
        alias: {
            WSprovider: '@vite/vitejs/dist/es5/provider/WS',
            vue: 'vue/dist/vue.js',
            src: SRC_PATH,
            pages: path.join(SRC_PATH, '/pages'),
            assets: path.join(SRC_PATH, '/assets'),
            utils: path.join(SRC_PATH, '/utils'),
            i18n: path.join(SRC_PATH, '/i18n'),
            services: path.join(SRC_PATH, '/services'),
            components: path.join(SRC_PATH, '/components')
        },
        extensions: ['.js', '.scss', '.vue', '.json']
    }
};
module.exports = webpackConfig;