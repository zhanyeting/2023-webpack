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
        // static: {
        //     directory: path.join(__dirname, 'dist'),
        // }, // 默认是把/dist目录当作web服务的根目录

        // 如果你在开发环境中起了一个devserve服务，并期望你的同事能访问到它，你只需要配置
        host: '0.0.0.0',

        port: 9000,  // 指定监听请求的端口号, 默认是 8080
        compress: true,  // //可选择开启gzips压缩功能，对应静态资源请求的响应头里的Content-Encoding: gzip
        
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true, 
        },
        // 有些场景需求下，我们需要为所有响应添加headers,来对资源的请求和响应打入标志，以便做一些安全防范，或者方便发生异常后做请求的链路追踪。
        // headers: {
        //     'X-Fast-Id':  'p3fdg42njghm34gi9ukj',
        // },
        // 有时候需要传一个函数，比如上面的 id ,不应该写死，应该随机生成。
        headers: () => {
            return { 'X-Bar': ['key1=value1', 'key2=value2'] };
        },
        
        // proxy: {  // 设置代理，处理跨域
        //     '/api': 'http://localhost:3000',   // 当前端请求 /api资源的时候，去 3000 服务器上请求
        // // 现在，对 /api/users 的请求会将请求代理到 http://localhost:3000/api/users。
        // // 之前，对 /api/users 的请求会将请求代理到 http://localhost:9000/api/users。
        // },
        // 如果不希望传递/api，则需要重写路径
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                pathRewrite: { '^/api': '' },   // 如果不希望传递/api，则需要重写路径
            // 现在，对 /api/users 的请求会将请求代理到 http://localhost:3000/users
            },
        },

        // 如果想将多个特定路径代理到同一目标，则可以使用一个或多个带有 context 属性的对象的数组
        // proxy: [
        //     {
        //       context: ['/auth', '/api'],
        //       target: 'http://localhost:3000',
        //     },
        // ],

        
        // 允许设置服务器和配置项（默认为 'http'）
        // server: 'https',  // 如果想让我们的本地http服务变成https服务，我们只需要这样配置
        // server: "spdy" ,  // 默认是-'http' | 'https' | 'spdy' string object

        // 使用对象语法提供自己的证书
        // server: {
        //     type: 'https',
        //     options: {
        //       minVersion: 'TLSv1.1',
        //       key: fs.readFileSync(path.join(__dirname, './server.key')),
        //       pfx: fs.readFileSync(path.join(__dirname, './server.pfx')),
        //       cert: fs.readFileSync(path.join(__dirname, './server.crt')),
        //       ca: fs.readFileSync(path.join(__dirname, './ca.pem')),
        //       passphrase: 'webpack-dev-server',
        //       requestCert: true,
        //     },
        // },


        // 以通过配置来提供页面代替任何404的静态资源响应：
        historyApiFallback: true,

        // 在多数业务场景下，我们需要根据不同的访问路径定制替代的页面，
        // 这种情况下，我们可以使用rewrites这个配置项
        // historyApiFallback: {
        //     rewrites: [
        //         { from: /^\/$/, to: '/views/landing.html' },
        //         { from: /^\/subpage/, to: '/views/subpage.html' },
        //         { from: /./, to: '/views/404.html' },
        //     ],
        // },


        // 启用模块热替换功能，默认是开启的
        hot: true,
        // 启用热更新
        liveReload: true,
    },
}

