const path = require('path');
const DllPlugin = require('webpack').DllPlugin;

module.exports = {
    mode: 'production',
    entry: {
        vendor: ['lodash', 'jquery'],   // lodash jquery 等第三方库提取出来
        // vendor: ['react', 'react-dom', 'lodash']  // 把 React, ReactDOM, lodash 这些第三方库提取出来
    },
    output: {
        filename: '[name].dll.js',   // 输出的文件名
        path: path.resolve(__dirname, 'dll'),   
        library: '[name]_lib',  // 输出的库的全局变量名称
    },

    plugins: [
        new DllPlugin({
            name: '[name]_lib',  // 要和上面 library 的名称一致
            path: path.join(__dirname, "dll", "[name]-manifest.json"),  // manifest 文件的输出路径
        })
    ]
}