const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

// 生产环境配置
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },
    output: {
        filename: 'js/[name].bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: 'http://localhost:8080/',   // 配置 cdn 位置路径
        clean: true,
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
    },

    // 根据命令行参数 env 来设置不同环境的 mode
    mode: 'production',
    // devtool: 'inline-source-map',     // 生产环境不需要这些配置
    // devServer: {
    //     static: '../dist',
    // },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/template.html',
            inject: 'body',
            hash: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css',
        }),
    ],

    // loader配置
    module: {
        rules: [
            //  解析 图片
            {
                test: /\.(png|jpe?g)$/,
                type: 'asset',   // 自动区分，小于25kb生成 base64，大于则生成图片文件
                generator: {
                    filename: 'images/[name][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 25*1024,   // 25kb
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline',   // 直接生成 base64 
            },
            {
                test: /\.txt$/,
                type: 'asset/source',   // 拿到源代码
            },
            // 解析 字体 
            {
                test: /\.(woff|woff2|eot|otf|ttf)$/,
                type: 'asset/resource',   // 可以处理任何资源文件
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            // 解析 样式
            {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            // 解析 ES6 js 代码
            {
                test: /\.js$/,
                exclude: /[\\/]node_modules[\\/]/,  // 排除掉 node_modules 下面的 js 代码
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: [ [
                            '@babel/plugin-transform-runtime']
                        ]
                    }
                }

            }
        ]
    },

    // 优化项
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),  // 压缩 css 代码
            new TerserPlugin(),   // 压缩 js 代码
        ],

        chunkIds: "named", // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
        splitChunks: {
            chunks: 'all',
            minSize: 30000,   // 30kb
            // maxSize: 0,

            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                common: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                async: {
                    chunks: 'async',
                    name: 'async',
                    minChunks: 2,
                    maxInitialRequests: 3,
                    maxAsyncRequests: 5,
                    priority: -21,
                    reuseExistingChunk: true,
                }
            }
        }
    },

    //关闭 webpack 的性能提示
    // performance: {
    //     hints:false
    // }
}
