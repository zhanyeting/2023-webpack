const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        clean: true,
    },

    mode: 'production',
    // mode: 'development',
    // devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin(),
    ],

    optimization: {
        usedExports: true,   // 去除未使用的导出内容
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ]
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
}