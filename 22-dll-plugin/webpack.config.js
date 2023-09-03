const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DllReferencePlugin = require('webpack').DllReferencePlugin;
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    plugins: [
        new HtmlWebpackPlugin(),

        new DllReferencePlugin({
            // context: __dirname,
            manifest: path.resolve(__dirname, 'dll/vendor-manifest.json'),
        }),

        // 添加 js 或者 css 文件到 html 中，以 script 的方式引入
        new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, 'dll/vendor.dll.js'),
            publicPath: './',   // 找到 dist/vendor.dll.js         
        }),

        // 多个dll文件的配置
        // new AddAssetHtmlPlugin([
        //     { filepath: require.resolve('./some-file') },
        //     { filepath: require.resolve('./some-other-file') },
        //     // Glob to match all of the dll file, make sure to use forward slashes on Windows
        //     { glob: require.resolve('./**/*.dll.js') },
        // ]),
    ]
}