const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

    // 局部样式走 css 模块化
    // 
    module: {
        rules: [
            // css module 样式
            {
                test: new RegExp(`^(?!.*\\.global).*\\.css`),  
                exclude: [path.resolve(__dirname, "..", 'node_modules')],
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                localIdentName: "[local]__[hash:base64:8]",
                            },
                        },
                    },
                    "postcss-loader"
                ]
            },

            // 普通 样式
            {
                test: new RegExp(`^(.*\\.global).*\\.css`),
                exclude: [path.resolve(__dirname, "..", 'node_modules')],
                use: ["style-loader", "css-loader", "postcss-loader"],
            }
        ]
    },
    // 所有样式文件，都走 css 模块化
    // module: {
    //     rules: [
    //         {
    //             test: /\.css$/,
    //             use: [
    //                 'style-loader',
    //                 {
    //                     loader: 'css-loader',
    //                     options: {
    //                         // modules: true,  // 开启css模块, 多人开发时，无需担心命名冲突的问题
    //                         modules: {
    //                             // localIdentName: "[local]--[contenthash:16]",
    //                             localIdentName: "[local]__[hash:base64:6]",
    //                         },
    //                         importLoaders: 1,
    //                     }
    //                 },
    //                 // "postcss-loader",   // 这样配置需要加 postcss.config.js 配置文件
    //                 {
    //                     loader: "postcss-loader",
    //                     options: {
    //                         postcssOptions: {
    //                             plugins: [
    //                                 "autoprefixer",
    //                                 "postcss-nested",
    //                             ]
    //                         }
    //                     }
    //                 }
    //             ]
    //         }
    //     ]
    // },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin(),
    ],

}