// 开发环境配置（exclude 公共配置）
module.exports = {
    output: {
        filename: 'js/[name].js',
        assetModuleFilename: 'assets/[name][ext]',
    },

    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        static: '../dist',
    },
}

