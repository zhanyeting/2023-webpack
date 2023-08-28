console.log(11111);

/** 
 * 1-全局变量依赖
 */
console.log(_.join(['hello, ', "global", "shimming"], "  "));
console.log(join(['hello, ', "global", "function-join", "shimming"], "  "));

/**
 * 2-细粒度 shimming
 *  将 this 指向为 window
 */
this.alert("hello 2-细粒度 shimming")

/**
 * 3-全局 Exports
 */
const {file, test}  = require('./global');
console.log(file, test());

/**
 * 4- 进一步优化 polyfill
 */
// import "@babel/polyfill";
console.log(Array.from([6,7,8], x => x+x));


/**
 * Shimming 预置依赖
 * 
 *  1）全局变量依赖  --- 看起来没什么大用处，会增加 bundle 的体积
 *      使用 webpack.ProvidePlugin 去预置 lodash 为全局变量，也可以仅仅预置某个方法为全局函数
 *      plugins: [
 *          new webpack.ProvidePlugin({
 *              _: "lodash",   // 全局变量 _ 
 *              join: ["lodash", "join"],  // 局部函数 join
 *          })
 *      ]
 * 
 *  2）细粒度的 shimming
 *     一些遗留模块依赖的 this 指向的是 window 对象
 *     默认是指向 commonJS 的 module.exports, 现在需要将 this 指向改为 window
 *     在 loader 解析器中， 使用 imports-loader?wrapper=window
 *      module: {
 *          rules: [{
 *              test: require.resolve('./src/index.js'),  // 只针对某个文件
 *              use: 'imports-loader?wrapper=window'
 *          }]
 *      }
 * 
 * 3) 全局 Exports
 *    让我们假设，某个 library 创建出一个全局变量，它期望 consumer(使用者) 
 * 使用这个变量, 但使用者不知到导出方式是怎样的，所以需要在这里配置一下export
 *    global.js 这个 lib 有一个变量 file 和 test|parse 两个函数，但是
 * 我们不知到这个 lib 的导出方式，可能都没有导出，所以这里需要配置一下
 *    使用 exports-loader?type=commonjs&exports=file,mutiple|helpers.test|test
 *    module: {
 *      rules: [{
 *          test: require.resolve('./src/global.js'),
 *          use: "exports-loader?type=commonjs&exports=file,mutiple|helpers.test|test",
 *      }]
 *    }
 *   在 index.js 中就可以使用commonjs的方式引入了
 *      const {file, test} = require('./global.js')
 * 
 * 
 * 4）优化 @babel/polyfill
 *    1）第一步，npm i -D @babel/polyfill 安装好 @babel/polyfill 后，
 * 使用 import 将其引入到我们的主 bundle 文件
 *       import "@babel/polyfill";
 *       // 使用polyfill将下面的 es6 代码转化为低版本浏览器能解析的代码
 *       console.log(Array.from([1,2,3], x => x+x));
 * 
 *    2）更近一步优化 polyfill ；
 *      不建议使用 import @babel/polyfilll 。因为这样做的缺点是会全局引入
 * 整个polyfill包，比如 Array.from 会全局引入，不但包的体积大，而且还会污染
 * 全局环境。
 *      babel-preset-env package 通过 browserslist 来转译那些你浏览器中不支持的特
性。这个 preset 使用 useBuiltIns 选项，默认值是 false ，这种方式可以将全局
babel-polyfill 导入，改进为更细粒度的 import 格式。
        1--安装 @babel/preset-env 及 相关的包
           npm i -D babel-loader @babel/core @babel/preset-env @babel/polyfill
 *      2--安装 corejs@3 包，安装 3 的版本，因为 useBuiltIns: 'usage' 需要这个包
        3--配置 babel-loader 和 它的presets
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: [
                                    "last 1 version",
                                    "> 1%",
                                ],
                                useBuiltIns: 'usage',
                                corejs: 3,
                            }
                        ]
                    ]
                }
            }
        }
        
        useBuiltIns: 参数有 “entry”、”usage”、false 三个值
        默认值是 false ，此参数决定了babel打包时如何处理@babel/polyfilll 语句。
        “entry”: 会将文件中 import @babel/polyfilll 语句 结合 targets ，转换为一系
列引入语句，去掉目标浏览器已支持的 polyfilll 模块，不管代码里有没有用到，只要
目标浏览器不支持都会引入对应的 polyfilll 模块。
        “usage”: 不需要手动在代码里写 import @babel/polyfilll ，打包时会自动根据
实际代码的使用情况，结合 targets 引入代码里实际用到部分 polyfilll 模块
        false: 对 import‘@babel/polyfilll’不作任何处理，也不会自动引入 polyfilll 模块。
需要注意的是在 webpack 打包文件配置的 entry 中引入的 @babel/polyfill 不会根据 
useBuiltIns 配置任何转换处理

 */