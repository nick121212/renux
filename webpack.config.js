const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const env = process.env.NODE_ENV || "dev";

const __DEV__ = env.toUpperCase() == "DEV" || env.toUpperCase() == "DEVELOPMENT";
const __TEST__ = env.toUpperCase() == "UAT";
const __PROD__ = env.toUpperCase() == "production";
const __STAG__ = env.toUpperCase() == "STG";

module.exports = {
    entry: {
        index: __DEV__ ? ['./src/demo'] : ['./src/index.tsx']
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: '/',
    },
    devtool: __DEV__ ? "cheap-module-eval-source-map" : "cheap-module-source-map",
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.ts(x?)$/,
            loader: 'tslint-loader',
            exclude: /node_modules/,
        }, {
            test: require.resolve("react-addons-perf"),
            loader: "expose-loader?Perf"
        }, {
            test: /module\.styl/,
            loader: 'style-loader!css-loader?modules!postcss-loader!stylus-loader',
        }, {
            test: /module\.css/,
            loader: 'style-loader!css-loader?modules!postcss-loader',
        }, {
            test: /\.css/,
            exclude: /module\.css/,
            loader: 'style-loader!css-loader!postcss-loader',
        }, {
            test: /\.ts(x?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader!awesome-typescript-loader',
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
        }, {
            test: /\.json/,
            loader: 'json-loader',
        }, {
            test: /\.(jpg|png)/,
            loader: 'file-loader',
        }, {
            test: /content\/.*\.svg$/,
            loader: 'file-loader',
        }, {
            test: /icons\/.*\.svg$/,
            loader: 'raw-loader!svgo-loader?{"plugins":[{"removeStyleElement":true}]}',
        }, {
            test: /\.md/,
            loader: 'raw-loader',
        }],
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(env),
                "__DEV__": JSON.stringify(__DEV__),
                "__TEST__": JSON.stringify(__TEST__),
                "__PROD__": JSON.stringify(__PROD__),
                "__STAG__": JSON.stringify(__STAG__)
            },
        }),
        __DEV__ ? new HtmlWebpackPlugin({
            // favicon: 'static/favicon.png',
            template: 'src/index.html',
        }) : new CleanWebpackPlugin(
            ['dist/**',],　 //匹配删除的文件
            {
                root: __dirname,       　　　　　　　　　　//根目录
                verbose: true,        　　　　　　　　　　//开启在控制台输出信息
                dry: false        　　　　　　　　　　//启用删除文件
            }
        ),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            comments: false,
            compress: {
                unused: true,
                dead_code: true,
                warnings: false,
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    cssnano({
                        autoprefixer: {
                            add: true,
                            remove: true,
                            browsers: ['last 2 versions'],
                        },
                        discardComments: {
                            removeAll: true,
                        },
                        safe: true,
                    })
                ],
                svgo: {
                    plugins: [
                        { removeStyleElement: true },
                    ],
                },
            }
        }),
    ],
    resolve: {
        extensions: ['.js', '.ts', '.tsx']
    },
    externals: __DEV__ ? {} : {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'redux': 'redux',
        'redux-actions': true,
        'redux-immutable': true,
        'redux-saga': true,
        'json-pointer': true,
        'modelproxy': true,
        'reselect': true,
        'immutable': true,
        'inversify': true,
        'recompose': true,
        'react-redux': true,
        'reflect-metadata': true
    }
}