const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,   // 清掉上一次打包遗留的垃圾文件
    },

    mode: 'development',   // 开发模式
    devtool: 'inline-source-map',  // 报错时，定位到源代码的位置
    // "^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$"
    devServer: {          // 开启一个服务器，实现浏览器实时更新数据
        static: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',  // assets/index.html
            template: './template.html',
            hash: true,   // bundle.js?24dab207e0123344a92c 防止浏览器缓存机制
            inject: 'body',   // 将所有打包的 js 和 css 等资源插入到 body 节点中
        }),
    ]
}