// const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    // ESM 类型 需要加上这项配置, 这个表示还是实验阶段
    // experiments: {
    //     outputModule: true,
    // },
    output: {
        filename: 'webpack-number.js',  // 打包后的名字
        path: path.resolve(__dirname, 'dist'),
        clean: true,

        // 这种配置，只能通过 script 标签引入，无法使用 CommonJS， AMD ，require 等方式引入
        // library: 'webpackNumbers',  // 暴露从入口导出的内容, 
        
        // 在 CommonJS、AMD、Node.js 等环境中运行
        library: {   
            name: 'WebpackNumbers',   // 如果 type: module，这里需要注释掉
            // type: 'window',  // script
            // type: 'module',     // ESM
            // type: 'commonjs',   // CommonJS
            type: 'umd', // 可以在 CommonJS、AMD、Node.js 等环境中运行
        },

        // 修复 commonJS 中的 self 存在的bug
        globalObject: 'globalThis',
    },

    mode: "production",

    // 使用 externals, 让 lodash 不会打包到 index.js 中
    // 这项配置和  experiments.outputModule 产生了冲突，需要注释掉experiments
    externals: {
        lodash: {
            commonjs: 'lodash',
            commonjs2: 'lodash',
            amd: 'lodash',
            root: "_",
        }
    }
}