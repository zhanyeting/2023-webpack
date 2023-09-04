const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); 
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
// cnpm i -D imagemin imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo  svgo
const ImageMinimizerWebpackPlugin = require('image-minimizer-webpack-plugin');
const toml = require('toml');
const yaml = require('yaml');
const json5 = require('json5');

module.exports = {
    entry: {  // 多入口配置用 对象结构
        index: './src/index.js',  // 入口文件位置
    },

    output: {
        filename: '[name].verdor.js', // 打包输出的 js 文件名
        path: path.resolve(__dirname, 'dist'),   // 打包文件全部放到 dist 文件夹下面，这里必须是绝对路径
        clean: true,   // 清除上一次打包的遗留文件
        assetModuleFilename: 'assets/[name].[contenthash:8][ext][query]',   // 输出资源文件
    },

    // mode: 'production',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {   // webpack-dev-server 底层是基于 node 的 http 服务
        static: {
            directory: './dist',  // 默认是把/dist目录当作web服务的根目录
        },
        open: true, // 是否自动打开浏览器

        host: '0.0.0.0',  // 如果你在开发环境中起了一个devserve服务，并期望你的同事能访问到它，你只需要配置
        port: 3000,  // 指定监听请求的端口号, 默认是 8080
        // 配置请求头, 
        headers: () => {
// 有些场景需求下，我们需要为所有响应添加headers,来对资源的请求和响应打入标志，以便做一些安全防范，或者方便发生异常后做请求的链路追踪。
            return {
                'X-Fast-Id': p3fdg42njghm34gi9ukj,
                'X-Bar': ['key1=value1', 'key2=value2'],
                'X-Date': new Date().getTime(),
            }
        },
//可选择开启gzips压缩功能，对应静态资源请求的响应头里的Content-Encoding: gzip
        compress: true,

        // 客户端设置
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true,  // 默认就是 true
        },

        // 服务器设置
        server: 'http',  // 默认是-'http' | 'https' | 'spdy' string object
        // server: 'https',  // 如果想让我们的本地http服务变成https服务，我们只需要这样配置
        // 使用对象语法提供自己的证书
        // server: {
        //     type: 'https',
        //     options: {
        //         minVersion: 'TLSv1.1',
        //         key: fs.readFileAsync(path.join(__dirname, './server.key')),
        //         pfx: fs.readFileAsync(path.join(__dirname, './server.pfx')),
        //         cert: fs.readFileAsync(path.join(__dirname, './server.crt')),
        //         ca: fs.readFileAsync(path.join(__dirname, './ca.pem')),
        //         passphrase: 'webpack-dev-server',
        //         requestCert: true,
        //     }
        // },

        // 开启代理， 处理跨域
        proxy: {
            // '/api': 'http://localhost:9000/',  // 当前端请求 /api资源的时候，去 9000 服务器上请求
            // // 现在，对 /api/users 的请求会将请求代理到 http://localhost:9000/api/users。
            // // 之前，对 /api/users 的请求会请求到本地服务器 http://localhost:3000/api/users。
        
            '/api': {
                target: 'http://localhost:9000/',
                // 如果不希望传递/api，则需要重写路径
                pathRewrite: {'^/api': ''},
               // 现在，对 /api/users 的请求会将请求代理到 http://localhost:9000/users
            },

        },
        // 如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象的数组
        // proxy: [
        //     {
        //       context: ['/auth', '/api'],
        //       target: 'http://localhost:3000',
        //     },
        // ],

        // 以通过配置来提供页面代替任何404的静态资源响应：
        historyApiFallback: true,
        // 启用模块热替换功能，默认是开启的
        hot: true,
        // 启用热更新
        liveReload: true,
    },

    plugins: [
        // 生成 html 文件，并将打包的 js 文件插入到 script 标签中
        new HtmlWebpackPlugin({
            template: './public/template.html',  // 模板html文件路径
            filename: 'static/index.html',   // 生成的文件名和路径
            inject: 'body',   // 默认是 head，script 标签插入的位置
            hash: true,   // 是否生成hash标志， bundle.js?24dab207e0123344a92c 防止浏览器缓存机制
        }),

        // 生成 css 文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
        }),

        // 打包分析工具
        // new BundleAnalyzerPlugin(),
    ],


    module: {
        // 各种 loader
        rules: [
            // 图片 loader
            {
                test: /\.(png|jpe?g|svg|gif|webp)$/,
                type: 'asset',   // 超过8k就生成资源文件，反之导出 URI
                // type: 'asset/resource',   // 生成一个资源并导出 URI
                // type: 'asset/inline',    // 仅导出一个资源的 URI
                // type: 'asset/source',   // 导出资源的 源代码
                generator: {
                    filename: 'images/[name].[contenthash:4][ext]'
                },
                parser: {
                    dataUrlCondition: 8*1024,  // 8KB
                }
            },{
                test: /\.txt$/,
                type: 'asset/source',  // 导出资源的 源代码
            },
            // 处理 字体文件的 loader
            {   // 对于一些音频 视频 文件，一并处理了
                test: /\.(woff|woff2|eot|otf|ttf|map4|map3|avi)$/,
                type: 'asset/resource',
            },
            // 处理 css less 等样式的loader
            {   
                test: /\.(css|less)$/,
                use: [
                    // 这里要使用 MiniCssExtractPlugin.loader 代替原来的 style-loader，
                    // 才能在 link 标签中引入样式
                    MiniCssExtractPlugin.loader, 
                    // 'style-loader',
                    // 'css-loader',   
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // modules: true,  // 开启css模块, 多人开发时，无需担心命名冲突的问题
                            modules: {
                                localIdentName: '[local]--[contenthash:8]',
                                // localIdentName: "[local]__[hash:base64:8]",
                            }
                        }
                    },
                    // "postcss-loader",   // 这样配置需要加 postcss.config.js 配置文件
                    {// npm i postcss-loader postcss postcss-preset-env -D
                     // 需要在 package.json 中配置 "browserslist": ["last 2 version", "> 1%", "not dead"]，
                    //  测试测试兼容性所以设置兼容浏览器 ie8 以上，可以用 "browserslist": ["ie >= 8"]
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',  // 能解决大多数样式兼容性问题
                                    'autoprefixer',
                                    'postcss-nested'
                                ]
                            },
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                
                            }
                        }
                    },
                ]
            },
            {// 处理 sass scss 文件
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {// 处理 stylus 文件
                test: /\.styl$/,
                use: ["style-loader", "css-loader", "stylus-loader"],
            },
            // js loader
            {
                test: /\.jsx?$/,
                include: './src',    // 制定解析的目录，可以减少索引路径
                exclude: /node_modules/,  // 排除掉 node_modules
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            // 优化 @babel/polyfill
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        targets: [
                                            'last 2 version',
                                            '> 1%',
                                        ],
                                        useBuiltIns: 'usage',
                                        corejs: 3,
                                    }
                                ]
                            ],
                            plugins: [
                                ['@babel/plugin-transform-runtime']
                            ],
                        },
                    },
                    {
                        loader: 'eslint-loader',
                    }
                ]
            },

            // ts loader
            {
                test: /\.tsx?$/,
                use: ['ts-loader', 'eslint-loader']
            },

            // 解析 xml csv toml yaml json5 等数据资源的 loader
            {
                test: /\.(csv|tsv)$/,
                use: 'csv-loader',
            },{
                test: /\.xml$/,
                use: 'xml-loader',
            },{
                test: /\.yaml$/,
                type: 'json',
                parser: {
                    parse: yaml.parse,
                }
            },{
                test: /\.toml$/,
                type: 'json',
                parser: {
                    parse: toml.parse
                }
            },{
                test: /\.json5$/,
                type: 'json',
                parser: {
                    parse: json5.parse
                }
            }
        ]
    },

    // 模块解析
    resolve: {
        // 取别名，减少相对路径的查找时间
        alias: {
            // "@util": "./src/util/",
            "@utils": path.resolve(__dirname, 'src/utils/'),  
            // import add from '@utils/add';
            "@": "./src",
        },

        // 省略扩展名的文件查找顺序，项目中没有的不写，减少索引次数
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],   // tsx 和 jsx 二选一即可 
    
        // 如果你不使用 symlinks（例如 npm link 或者 yarn link ），
        // 可以设置 resolve.symlinks: false
        symlinks: false,    // 默认为 true
    },

    // 外部扩展，
    // 有时候我们为了减小bundle的体积，从而把一些不变的第三方库用cdn的形式引入进来
    // 如果你只定义 1 个 external，您也可以使用快捷语法
    // externals: 'jquery',
    externals: {
        // lodash: 'lodash',
        // jquery: 'jquery',

        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_',  // 指向全局变量
        },     
        // 指定cdn路径， 这项配置需要 "script", 
        jquery: [
            'script https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
            '$'
        ]
    },
    // externalsType: 'script',   // 默认是 var 

    optimization: {
        // runtimeChunk: true,  // 为运行时代码创建了一个额外的 chunk，
        runtimeChunk: {
            name: 'runtime~[name]'
        },
        usedExports: true,   // 去除未使用的导出内容
        // 压缩（生产环境需要）
        minimize: true, // 告知 webpack5 使用默认 TerserPlugin
        minimizer: [
            // 压缩 css
            new CssMinimizerWebpackPlugin(),

            // 压缩 js
            new TerserWebpackPlugin(),
            // new TerserPlugin({   // 压缩 js 代码
            //     test: /\.js(\?.*)?$/i,
            //     exclude: /[\\/]node_modules[\\/]/,
            //     parallel: true,  // 使用多进程并发运行以提高构建速度。 并发运行的默认数量： os.cpus().length - 1
            //     terserOptions: {
            //         ecma: undefined,
            //         parse: {},
            //         compress: {},
            //         mangle: true, // Note `mangle.properties` is `false` by default.
            //         module: false,
            //         // Deprecated
            //         output: null,
            //         // format: null,
            //         toplevel: false,
            //         nameCache: null,
            //         ie8: false,
            //         keep_classnames: undefined,
            //         keep_fnames: false,
            //         safari10: false,
            //         format: {
            //             comments: /@license/i,   //保留 /@license/i 注释
            //         },
            //       },
            //       extractComments: true,  // 启用/禁用剥离注释功能。
            // }),  


            // 压缩 图片, 无损压缩
            new ImageMinimizerWebpackPlugin({
                minimizer: {
                    implementation: ImageMinimizerWebpackPlugin.imageminGenerate,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            [
                                'svgo',
                                {
                                    plugins: [
                                        "preset-default",
                                        "prefixIds",
                                        {
                                            name: 'sortAttrs',
                                            params: {
                                                xmlnsOrder: 'alphabetical'
                                            },
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],


        chunkIds: "named", // 指定打包过程中的chunkId，设为named会生成可读性好的chunkId，便于debug
        // 代码分离
        splitChunks: {
            chunks: 'all',  // 自动分离出，多入口中，重复使用的公共模块
            automaticNameDelimiter: '~',
            // minSize: 30000,

            // chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,  //30,
            maxInitialRequests:  5, //30,
            enforceSizeThreshold: 50000,

            // 缓存
            cacheGroups: {
                react: {
                    test: /[\\/]node_modules[\\/]react(.*)?[\\/]/,
                    name: 'chunk-react',
                    chunks: 'all',
                    priority: 40,
                    // minChunks: 2
                    // maxAsyncRequests: 5,
                    // maxInitialRequests: 5,
                    reuseExistingChunk: true,
                },
                bizcharts: {
                    test: /[\\/]node_modules[\\/]bizcharts[\\/]/,
                    name: 'chunk-bizcharts',
                    chunks: 'initial',  // 入口处
                    minChunks: 1,
                    priority: 39,
                    reuseExistingChunk: true,
                },
                asyncVendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-async',
                    chunks: 'async',    // 异步的
                    priority: 37,
                    reuseExistingChunk: true,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'chunk-vendor',
                    chunks: 'all',
                    priority: 36,
                    reuseExistingChunk: true,
                }
            }
        },

        // Webpack 通过执行额外的算法任务，来优化输出结果的体积和加载性能。
        // 这些优化适用于小型代码库，但是在大型代码库中却非常耗费性能：
        removeAvailableModules: false, //如果模块已经包含在所有父级模块中，告知 webpack 从 chunk 中检测出这些模块，或移除这些模块。将 optimization.removeAvailableModules 设置为 true 以启用这项优化。在 production 模式 中默认会被开启。
        // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk。将 optimization.removeEmptyChunks 设置为 false 以禁用这项优化。
        // removeEmptyChunks: false,   // 默认是 false
        // splitChunks: false,
    },

    //关闭 webpack 的性能提示
    performance: {
        hints:false
    },
}