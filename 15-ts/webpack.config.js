const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.ts',

    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },

    mode: 'development',
    devtool: "inline-source-map",
    devServer: {
        static: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.(css|less)$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            }
        ]
    },

    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    }
}