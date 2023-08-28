import hello from './hello';

// webpack 引入 图片 资源
import jpgSrc from '../public/assets/nav.jpg';
import jpgSrc2 from '../public/assets/jenny.jpg';
import pngSrc from '../public/assets/img.png';
import svgSrc from '../public/assets/logo.svg';
import txtSrc from '../public/assets/hello.txt';

// webpack 引入 css 等样式资源
import './style.css';
import './style.less';
// webpack 引入 font 等字体资源, 在 CSS 中引入的

// webpack 引入 xml yaml toml 等数据资源
import Data from '../public/assets/data.xml';
import Notes from '../public/assets/data.csv';
import toml from '../public/assets/data.toml';
import yaml from '../public/assets/data.yaml';
import json5 from '../public/assets/data.json5';

// 引入动态导入 模块
import './async-module'; 
// 动态导入模块，并解构
// import {add, minus, print } from './math.js';
// const {add, minus, print } = await import(
//     /* webpackChunkName: 'math', */     
//     './math.js'
// );

hello();
console.log("here is index.js ");

const pngEle = document.createElement('img');
pngEle.style.cssText = 'width: 400px; height: 200px;'
pngEle.src = pngSrc;
document.body.appendChild(pngEle);

const jpgEle = document.createElement('img');
jpgEle.style.cssText = 'width: 600px; height: 250px;'
jpgEle.src = jpgSrc;
document.body.appendChild(jpgEle);

const jpgEle2 = document.createElement('img');
jpgEle2.style.cssText = 'width: 100px; height: 100px;'
jpgEle2.src = jpgSrc2;
document.body.appendChild(jpgEle2);

const svgEle = document.createElement('img');
svgEle.style.cssText = 'width: 500px; height: 200px; background: yellow;'
svgEle.src = svgSrc;
document.body.appendChild(svgEle);

const txtEle = document.createElement('div');
txtEle.style.cssText = 'width: 400px; height: 150px; background: pink; display: inline-block;'
txtEle.classList.add('div_bg');
txtEle.textContent = txtSrc;
document.body.appendChild(txtEle);

// 给 body 添加样式 class
document.body.classList.add('hello');


// 引入 font 字体
const spanEle = document.createElement('span');
spanEle.classList.add('icon');
spanEle.innerHTML = '&#xe668;';
document.body.appendChild(spanEle);

// 打印 xml csv|tsv   toml yaml json5 等数据
console.log(Data);
console.log(Notes);

console.log(toml.title);
console.log(toml.owner.name, toml.owner);
console.log("\n", yaml.title);
console.log(yaml.owner.name, yaml.owner);
console.log("\n",json5.title);
console.log(json5.owner.name, json5.owner);

// 动态导入应用  --- 懒加载(按需加载)
const boxEle = document.createElement('div');
const addBtnEle = document.createElement('button');
const span = document.createElement('span');
addBtnEle.textContent = '懒加载 - 点击执行加法运算（4+5）';
addBtnEle.addEventListener('click', () => {
    // console.log(add(4,5));
    // span.textContent = add(4,5).toString();
    // boxEle.appendChild(span);

    /**
     * 懒加载 --- 按需加载，什么需要才会加载
     */
    // import('./math.js').then(({ add }) => {
    //     console.log(add(4,5));
    //     span.textContent = add(4,5).toString();
    //     boxEle.appendChild(span);
    // })

    // 动态导入可以使用 魔法注释， 告诉webpack打包生成的文件名为 math
    import(/* webpackChunkName: 'math' */'./math.js').then(({ add }) => {
        console.log(add(4,5));
        span.textContent = add(4,5).toString();
        boxEle.appendChild(span);
    })

    /** 预获取 prefetch   --- 最常用，在网络空闲的时候加载
     * 
     * 添加第二句魔法注释： webpackPrefetch: true
        告诉 webpack 执行预获取。这会生成 <link rel="prefetch" href="math.js">
        并追加到页面头部，指示着浏览器在闲置时间预取 math.js 文件
     */
    // import(/*webpackChunkName: 'math', webpackPrefetch: true*/'./math.js').then(({ add }) => {
    //     console.log(add(4,5));
    //     span.textContent = add(4,5).toString();
    //     boxEle.appendChild(span);
    // });

    /** 预加载 preload   --- 与主文档并行加载
     * 
     * 与 prefetch 指令相比，preload 指令有许多不同之处：
        1-preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk
            会在父 chunk 加载结束后开始加载。
        2-preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置
            时下载。
        3-preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会
            用于未来的某个时刻。
        4-浏览器支持程度不同
     */
    // import(/*webpackChunkName: 'math', webpackPreload: true*/'./math.js').then(({ add }) => {
    //     console.log(add(4,5));
    //     span.textContent = add(4,5).toString();
    //     boxEle.appendChild(span);
    // });
})
boxEle.appendChild(addBtnEle);
document.body.appendChild(boxEle)


const boxEle2 = document.createElement('div');
const addBtnEle2 = document.createElement('button');
const span2 = document.createElement('span');
addBtnEle2.textContent = '预获取 - 点击执行减法运算（4-5）';
addBtnEle2.addEventListener('click', () => {
    import(/* webpackChunkName: 'math' */'./math.js').then(({ minus }) => {

    console.log(minus(4,5));
    span2.textContent = minus(4,5).toString();
    boxEle2.appendChild(span2);
    });
})
boxEle2.appendChild(addBtnEle2);
document.body.appendChild(boxEle2);


const boxEle3 = document.createElement('div');
const addBtnEle3 = document.createElement('button');
const span3= document.createElement('span');
addBtnEle3.textContent = '预获取 - 点击执行 打印 运算 print(4,5)';
addBtnEle3.addEventListener('click', () => {
    import(/* webpackChunkName: 'math' */'./math.js').then(({ print }) => {

    console.log(print(4,5));
    span3.textContent = print(4,5);
    boxEle3.appendChild(span3);

    })
})
boxEle3.appendChild(addBtnEle3);
document.body.appendChild(boxEle3);

