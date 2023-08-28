const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {ModuleFederationPlugin} = require('webpack').container;

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin(),
        // 模块联邦
        new ModuleFederationPlugin({
            name: 'home',   // 模块联邦的名字
            filename: 'remoteEntry.js',  // 外部访问的资源名字
            remotes: {   // 引用的外部资源列表 
               nav: "nav@http://localhost:3001/remoteEntry.js",
            },
            exposes: {   // 暴露给外部的资源列表
                "./HomeList": "./src/homeList.js"
            },
            shared: {},  // 共享的资源列表，如 lodash react 等
        })
    ]
}