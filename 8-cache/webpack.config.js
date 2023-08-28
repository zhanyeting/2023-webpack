const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js',
        another: './src/another.js',
    },

    output: {
        filename: 'js/[name]-bundle-[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:8080/',
        clean: true,
        assetModuleFilename: 'assets/[name][contenthash][ext]',
    },

    mode: 'production',
    // mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
            filename: 'index.html',
            inject: 'body',
            hash: true,
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css'
        }),
    ],

    module: {
        rules: [
            // asset 资源处理
            {   
                test: /\.(png|jpg|jpeg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[name][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 25*1024,  // 25kb
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
            // 解析 font 字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },
            // 解析 css less 样式文件
            {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },
            
        ]
    },

    // 优化项
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),   // 压缩 css 代码
            new TerserPlugin({   // 压缩 js 代码
                test: /\.js(\?.*)?$/i,
                exclude: /[\\/]node_modules[\\/]/,
                parallel: true,  // 使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1
                terserOptions: {
                    ecma: undefined,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    module: false,
                    // Deprecated
                    output: null,
                    // format: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                    format: {
                        comments: /@license/i,   //保留 /@license/i 注释
                    },
                  },
                  extractComments: true,  // 启用/禁用剥离注释功能。
            }),  
        ],

        chunkIds: "named", // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
        splitChunks: {
            chunks: 'all',  // 自动分离出所有 重复的模块
            automaticNameDelimiter: '~',
            // minSize: 30000,

            // chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,  //30,
            maxInitialRequests:  5, //30,
            enforceSizeThreshold: 50000,


            // name: true,
            cacheGroups: {
                // 创建一个 vendors chunk，其中包括整个应用程序中 node_modules 的所有代码。
                // Warning： 这可能会导致包含所有外部程序包的较大 chunk。建议仅包括你的核心框架和实用程序，并动态加载其余依赖项。
                // vendor: {
                //     test: /[\\/]node_modules[\\/]/,
                //     name: "vendors",
                //     chunks: "all",
                // },

                // 创建一个 custom vendor chunk，其中包含与 RegExp 匹配的某些 node_modules 包
                // Warning: 这将导致将 react 和 react-dom 分成一个单独的 chunk。 如果你不确定 chunk 中包含哪些包，请参考 Bundle Analysis 部分以获取详细信息。
                // vendor: {
                //     test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                //     name: 'vendor',
                //     chunks: 'all',
                // },

                // lodash: {
                //     test: /[\\/]node_modules[\\/](lodash)[\\/]/,
                //     chunks: 'initial',
                //     name: 'vendor-lodash',
                //     minChunks: 1, 
                    
                //     maxInitialRequests: 5,
                //     priority: -10,
                //     reuseExistingChunk: true,
                // },
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    name: 'vendor',
                    minChunks: 1, 
                    
                    maxInitialRequests: 5,
                    priority: -11,
                    reuseExistingChunk: true,
                },
                default: {
                    chunks: 'initial',
                    // name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 3,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            }
        },
    }
}