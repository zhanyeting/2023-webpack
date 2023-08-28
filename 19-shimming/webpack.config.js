const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: './src/index',

    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin(),
        /**
         * 1-全局变量依赖
         */
        new webpack.ProvidePlugin({
            // _: 'lodash',  // 全局变量依赖
            join: ["lodash", "join"],   // 暴露出某个模块中单个导出，仅暴漏join方法
        })
    ],

    module: {
        rules: [
            /**
             * 2-细粒度shimming --- 将this指向为window
             *   这项配置得放在 babel 配置的后面
             */
            // {
            //     test: require.resolve('./src/index.js'),
            //     use: "imports-loader?wrapper=window"
            // },

            /**
             * 3-全局Exports, 将未知库中的函数导出
             */
            {
                test: require.resolve('./src/global.js'),
                use: "exports-loader?type=commonjs&exports=file, multiple|helpers.test|test"
            },
            // {  // ESM 方式有点走不通
            //     test: require.resolve('./src/global.js'),
            //     use: "exports-loader?exports=file, multiple helpers.parse parse"
            //     use: {
            //         loader: 'exports-loader',
            //         options: {
            //             exports: [
            //                 {
            //                     name: 'file',
            //                     alias: 'file',
            //                 },
            //                 {
            //                     name: "helpers.parse",
            //                     alias: "parse"
            //                 },
            //             ]
            //         }
            //     }
            // },

            /**
             * 4- 优化 @babel/polyfill
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    targets: [
                                        "last 1 version",
                                        "> 1%",
                                    ],
                                    useBuiltIns: "usage",
                                    corejs: 3,
                                }
                            ]
                        ]
                    }
                },
            },

            // 这项配置得放在 babel 配置的后面
            {
                test: require.resolve('./src/index.js'),
                use: "imports-loader?wrapper=window"
            },
        ]
    }
}