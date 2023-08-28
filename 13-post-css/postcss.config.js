module.exports = {
    plugins: [
        require('autoprefixer'),
        require('postcss-nested'),
    ]
}


/***
 * 1. 为什么要用 postcss？ 1）自动填充浏览器兼容的前缀   2)多人开发样式命名不冲突
 * 2. 安装 postcss postcss-loader autoprefixer postcss-nested
 * 3. a) loader中配置 postcss-loader, 同时配置 css-loader(开启 css 模块),
 *      {  
 *          loader: 'css-loader',
 *          options: {
 *              modules: true,  // 开启 css 模块
 *          }
 *      }
 *    b) 新增 postcss.config.js 配置文件，
 *         module.exports = {
 *              plugins: [
 *                  require('autoprefixer'),
 *                  require('postcss-nested')
 *              ]
 *          }
 *    c) package.json 中新增 browserslist: {'> 1%', 'last 2 versions'} 配置，
 *          browserslist: {
 *              '> 1%', 
 *              'last 2 versions'
 *          }
 * 4. 在 index.js 中，以模块化的形式导入样式，以 对象.样式名 的方式加入样式
 *      import style from './index.css';
 *      box.classList.add( style.box )
 * 
 * 5. 局部配置 css 模块 样式
 *      *.global.css  走普通css样式的方式引入  import 'xxx.global.css';
 *      *.css   走css模块化的方式引入  import style from 'xxx.css';
 * 
 */