const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const svgToMiniDataURI = require('mini-svg-data-uri');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        clean: true,
        assetModuleFilename: 'images/[name][contenthash][ext]',   // 这里统一设置资源文件
    },

    mode: 'development',
    devtool: 'inline-source-map',  // 'cheap-source-map'
    devServer: {
        static: './dist',
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html',
            filename: 'index.html',  // asserts/index.html,
            inject: 'body',
        })
    ],

    module: {
        rules: [
            { 
                test: /\.png$/,
                type: 'asset/resource',   // 生成一个资源并导出 URI
                generator: {
                    filename: 'images/[contenthash][ext]', // 设置生成资源文件位置和名称
                }
            },

            {
                test: /\.svg$/,
                type: 'asset/inline',    // 仅导出一个资源的 URI
                // webpack 输出的 data URI，默认是呈现为使用 Base64 算法编码的文件内容。
                // 如果要使用自定义编码算法，则可以指定一个自定义函数来编码文件内容。
                // 安装自定义函数模块： npm i mini-svg-data-uri -D
                // 使用自定义 data URI 生成器
                generator: {
                    dataUrl: content => {
                        return svgToMiniDataURI(content.toString())
                    }
                }
            },

            {
                test: /\.txt$/,
                type: 'asset/source',   // 导出资源的 源代码
            },

            {
                test: /\.jpg$/,
                type: 'asset',  // 超过8k就生成资源文件，反之导出 URI
                parser: {
                    dataUrlCondition: {
                        maxSize: 8*1024*1024,  // 8M
                    }
                }
            }
        ]
    }
}