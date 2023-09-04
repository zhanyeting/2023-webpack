const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    module: {
        rules: [
            {
                // 不使用 thread-loader, 耗时： 16992 ms
                // 使用后，平均耗时 12000ms 左右
                test: /\.js$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 4,   // 2,3,4,5,6  都差不多是 12s 左右
                        }
                    },
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env"]
                        }
                    }
                ]
            },
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ]
}