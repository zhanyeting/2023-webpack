const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // 抽离 样式 到一个文件，并在 link 标签中引入
// const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');


// 生产和开发环境的公共配置
module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        clean: true,
        assetModuleFilename: 'assets/[name].[contenthash][ext]',
    },

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
                test: /\.(png|jpe?g)$/i,
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
            }
        ]
    },

    // 优化项
    optimization: {
        minimizer: [
            // new CssMinimizerPlugin(),  // 压缩 css 代码
            // new TerserPlugin(),   // 压缩 js 代码

            // new ImageMinimizerPlugin({   // 有损压缩图片
            //   minimizer: {
            //     implementation: ImageMinimizerPlugin.squooshMinify,
            //     // options: {
            //     //   // Your options for `squoosh`
            //     //   encodeOptions: {
            //     //     mozjpeg: {
            //     //       // That setting might be close to lossless, but it’s not guaranteed
            //     //       // https://github.com/GoogleChromeLabs/squoosh/issues/85
            //     //       quality: 100,
            //     //     },
            //     //     webp: {
            //     //       lossless: 1,
            //     //     },
            //     //     avif: {
            //     //       // https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
            //     //       cqLevel: 0,
            //     //     },
            //     //   },
            //     // }
            //   },
            // }),
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
    }
}
