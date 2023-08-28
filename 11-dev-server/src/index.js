import hello from '@/util/hello';

//引入 图片 资源
import jpgSrc from './assets/nav.jpg';
import jpgSrc2 from './assets/jenny.jpg';
import pngSrc from './assets/img.png';
import svgSrc from './assets/logo.svg';
import txtSrc from './assets/hello.txt';

// 引入样式
import './index.css';
import './index.less';
// webpack 引入 font 等字体资源, 在 CSS 中引入的

// webpack 引入 xml yaml toml 等数据资源
import Data from './assets/data.xml';
import Notes from './assets/data.csv';
import toml from './assets/data.toml';
import yaml from './assets/data.yaml';
import json5 from './assets/data.json5';

// 引入另一个入口文件
import './another';

// 引入模块热替换模块
import HotBox from '@util/input';

// 静态引入 lodash
// import _  from 'lodash';
// console.log(_.join(["lodash", "called" , "by", "index.js"], ' '));

// 动态引入 lodash
import('lodash').then(({ default: _ }) => {
    console.log(_.join(["lodash", "called" , "by", "index.js"], ' '));
})

// 静态引入 math
// import { add, minus, print } from '@util/math';
// console.log("=====", add(4,5), minus(4,5), print(4,5));

// 动态引入 math
import('@util/math').then(({add, minus, print}) => {
    console.log("=====", add(4,5), minus(4,5), print(4,5));
})

// 动态引入 就会打出一个chunk来
// import('./util/hello').then(({hello}) => {
//     hello();
// })
hello();
console.log("Here is src/index.js ");

// 测试 extensions 配置是否生效
import jsonData from '@util';
console.log(" json data ==== ", jsonData);

import $ from 'jquery';
console.log($);


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


// 测试代理服务器是否生效
const boxEle = document.createElement('div');
boxEle.style.cssText = "color: blue; background-color: pink;";
fetch('/api/users').then(res => res.text()).then(res => {
    boxEle.textContent = res;
    document.body.appendChild(boxEle);
})

HotBox();
if(module.hot){
    module.hot.accept('./util/input.js');
}