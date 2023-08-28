
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离 样式 到一个文件，并在 link 标签中引入
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');  // 压缩 css
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');

/**
 * 动态导入--- 分离重复代码
 *   无论是多入口文件，还是单入口文件都可以使用，且不需要再配置 optimization.splitchunks  
 *      这里演示 单入口场景，(会在src3 和 config3 中演示多入口）
 */
module.exports = {
    // entry: './src/index.js',

    // 多入口
    //  ---- 代码中使用 动态导入 import('').then  的方式
    entry: {
        index: './src2/index.js',
        // another: './src2/another.js'
    },
    
    output: {
        // filename: 'vendor.js',
        filename: '[name]-bundle.js',   // 多入口需要配置，多出口
        path: path.resolve(__dirname, 'dist2'),
        clean: true,
        assetModuleFilename: 'assets/[name][contentHash][ext]',
    },

    // mode: 'production',

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist2',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
            filename: 'index.html',
            inject: 'body',
            hash: true,
        }),

        // 这个插件会将多个 样式合并成一个样式文件 main.css
        new MiniCssExtractPlugin({
            filename: 'css/[contenthash].css',  // 默认是 main.css
        }),
    ],

    module: {
        rules: [
            // 处理 asset 资源文件
            {
                test: /\.(png|jpg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext]',
                    // dataUrl 使用函数的方式会加载不出来图片
                    // dataUrl: (content) => {
                    //     if (typeof content !== 'string') {
                    //       content = content.toString();
                    //     }
                    //     return svgToMiniDataURI(content);
                    // }
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 25*1024,   // 小于 25kb，输出base64, 否则生成一个文件 
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',
            },
            {
                test: /\.txt$/,
                type: 'asset/source',
            },


            // 解析 css less 等的loader
            {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                // 这里要使用 MiniCssExtractPlugin.loader 代替原来的 style-loader，
                // 才能在 link 标签中引入样式
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },

            // 解析 ttf 等字体文件的 loader
            {
                test: /\.(ttf|woff|woff2|eot|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },

            // 解析 xml csv yoml 等数据资源的 loader
            {
                test: /\.xml$/,
                use: 'xml-loader',
            },
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader',
            },
            {
                test: /\.toml$/,
                type: 'json',
                parser: {
                    parse: toml.parse,
                }
            },
            {
                test: /\.yaml$/,
                type: 'json',
                parser: {
                    parse: yaml.parse
                }
            },
            {
                test: /\.json5$/,
                type: 'json',
                parser: {
                    parse: json5.parse
                }
            },

            // 解析 ES6 js 代码
            {
                test: /\.js$/,
                exclude: /node_modules/,   // 排除掉 node_modules 下面的 js 代码
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [
                            ["@babel/plugin-transform-runtime"]
                        ]
                    }
                }
            }
        ]
    },

    // 优化项
    optimization: {
        // 如果使用 import 动态导入的方式，那么就不需要这项配置了
        // splitChunks: {
        //     chunks: 'all',  // 自动分离出，多入口中，重复使用的公共模块
        // },
        minimizer: [
            new CssMinimizerPlugin(),    // 压缩 css
        ]
    }
}