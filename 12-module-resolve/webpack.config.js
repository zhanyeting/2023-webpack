const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'index.html',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'assets/[name].[contenthash:5][ext]',
    },

    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
        static: {
            directory: path.join(__dirname, './dist'),
        },
        host: '0.0.0.0',
        port: 9000,
        compress: true,

        headers: {
            'x-fast-id': 'cvfvdvfgteijier',
        },

        proxy: {
            "api": {
                target: "http://locahost:3000",
                pathRewrite: {"/api": ""},
            },
        },

        server: "http",
        // server: {
        //      type: 'https',
        //      option: {
        //         minVersion: 'TLSv1.1',
        //         key: fs.readFileSync(path.join(__dirname, './server.key')),
        //         pfx: fs.readFileSync(path.join(__dirname, './server.pfx')),
        //         cert: fs.readFileSync(path.join(__dirname, './server.crt')),
        //         ca: fs.readFileSync(path.join(__dirname, './ca.pem')),
        //         passphrase: 'webpack-dev-server',
        //         requestCert: true,
        //      }
        // },
        client: {
            overlap: false,
        },

        historyApiFallback: true,

        hot: true,
        liveReload: true,
    },

    plugins: [
        new BundleAnalyzerPlugin(),  // 构建依赖图
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(js|jsx)/,
                use: ['babel-loader', 'eslint-loader']
            }
        ]
    },

    // 模块解析的配置
    resolve: {
        // 取别名，减少相对路径的查找
        alias: {
            // "@util": "./src/util/",
            "@utils": path.resolve(__dirname, 'src/utils/'),  // import add from '@utils/add';
            "@": "./src",

        },
        // 导入路径时，省略的后缀，在模块被解析的时候，会根据这里的优先级来加上
        extensions: [".jsx", ".tsx", ".js", ".json"],
        // extensions: ['.js', '.json', '.wasm'],
    },

    // 外部扩展，
    // 有时候我们为了减小bundle的体积，从而把一些不变的第三方库用cdn的形式引入进来
    externals: {
        // jquery: 'jQuery',
        // jquery: "$",

        // jquery: 'commonjs jquery', // 指定类型库
        lodash: {
            commonjs: 'lodash',
            amd: 'lodash',
            root: '_', // 指向全局变量
        },

        // 指定cdn路径， 这项配置需要设置 externalsType: "script", 
        // jquery: [
        //     'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
        //     '$'
        // ],
        jquery: [
            'script https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
            '$'
        ]
    },
    // 如果你只定义 1 个 external，您也可以使用快捷语法
    // externals: 'jquery',

    // externalsType: 'script',  // 默认是 var 


    optimization: {
        minimize: true,  // 开启 terserPlugin 压缩
        minimizer: [

        ],

        splitChunks: {
            chunks: 'all',
        }
    }
}