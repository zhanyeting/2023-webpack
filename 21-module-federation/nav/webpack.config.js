const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin(),

        new ModuleFederationPlugin({
            name: 'nav',   // 模块联邦的名字
            filename: "remoteEntry.js",  // 外部访问的资源名字
            remotes: {},  // 引用的外部资源列表
            exposes: {    // 暴露给外部的资源列表
                './Header': './src/header.js',
            },
            // 共享资源，比如 lodash
            shared: {},
        })
    ]
}
