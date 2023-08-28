const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'vendor.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,   // 清除上一次遗留的文件
        assetModuleFilename: 'assets/[name][contenthash][ext]',
    },

    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './public/template.html',
            filename: 'index.html',
            inject: 'body',
            hash: true,
        }),

        new MiniCssExtractPlugin({
            filename: 'css/[name][contenthash].css'
        }),
    ],

    module: {
        rules: [
            // 处理 assets 资源文件
            {
                test: /\.(png|svg)$/,
                type: 'asset',
                generator: {
                    filename: 'images/[contenthash][ext]',
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 120*1024,   // 120kb 
                    }
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline'
            },
            {
                test: /\.txt$/,
                type: 'asset/source'
            },
            // 处理 font 字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf|)$/,
                type: 'asset/resource',   // 可以处理任何资源文件
                generator: {
                    filename: 'assets/[name][ext]'
                }
            },

            // 处理 css less 样式
            {
                test: /\.(css|less)$/,
                // use: ['style-loader', 'css-loader', 'less-loader'],
                // 使用 MiniCssExtractPlugin.loader 将样式 插入到 link 中
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
            },

            // 处理 js 文件中的 es6 语法，比如，async/await
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ["@babel/plugin-transform-runtime"]
                    }
                }
            }

        ]
    },

    // 优化项
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),   // 压缩 Css 代码

        ]
    }
}