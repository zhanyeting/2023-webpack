// 开发环境配置（exclude 公共配置）
module.exports = {
    output: {
        filename: 'js/[name].js',
        assetModuleFilename: 'assets/[name][ext]',
    },

    mode: "development",
    // devtool: 'eval',   //550kb 默认是 eval， 每个module会封装到 eval 里包裹起来执行，并且会在末尾追加注释 //@ sourceURL.
    // devtool: 'source-map',   //532kb 生成一个SourceMap文件.
    // devtool: 'hidden-source-map',  // 没什么用，和 source-map 一样，但不会在 bundle 末尾追加注释.
    // devtool: 'inline-source-map',  //1.4Mb 生成一个 DataUrl 形式的 SourceMap 文件
    // devtool: 'eval-source-map',    //1,43Mb 每个module会通过eval()来执行，并且生成一个DataUrl形式的SourceMap
    // devtool: 'cheap-source-map',   //549kb 生成一个没有列信息（column-mappings）的SourceMaps文件，不包含loader的 sourcemap（譬如 babel 的sourcemap）
    devtool: 'cheap-module-source-map',  //549kb 推荐使用； 生成一个没有列信息（column-mappings）的SourceMaps文件，同时 loader 的 sourcemap 也被简化为只包含对应行的
    devServer: {
        static: '../dist',
    },
}

