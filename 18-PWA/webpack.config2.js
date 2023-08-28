const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
    entry: './src/index.js',

    output: {
        clean: true,
    },

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
        // devMiddleware: {
        //     index: true,
        //     writeToDisk: true,    // 写入硬盘
        // }
    },

    plugins: [
        new HtmlWebpackPlugin(),
        new WorkboxPlugin.GenerateSW({   // 启用 workbox
            // 这些选项帮助快速启用 ServiceWorkers
            // 不允许遗留任何“旧的” ServiceWorkers
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],

    module: {
        rules: [
            {test: /\.(css|less)$/, use: ['style-loader', 'css-loader', 'less-loader']},
        ]
    }
}