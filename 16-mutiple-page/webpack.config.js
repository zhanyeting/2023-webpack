const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: ['./src/app.js', './src/app2.js', 'lodash'],
    entry: {
        app: {
            import: ['./src/app.js', './src/app3.js'],
            dependOn: "lodash",
            filename: 'channel1/[name].js',
        },
        app2: {
            import: "./src/app2.js",
            filename: 'channel2/app2.js',
        },
        lodash: {
            import: "lodash",
            filename: 'common/lodash.js',
        },
    },

    output: {
        // filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        // publicPath: "http://localhost:8080/",
        clean: true,
    },

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "多页应用页面 111 ",
            filename: 'channel1/index1.html',
            inject: 'body',
            publicPath: 'http://www.a.com/',
            chunks: ['app', 'lodash']
        }),
        new HtmlWebpackPlugin({
            title: "多页应用页面 2222 ",
            filename: 'channel2/index2.html',
            template: "./public/index.html",
            inject: 'head',
            publicPath: 'http://www.b.com/',
            chunks: ['app2']
        }),
    ]

}