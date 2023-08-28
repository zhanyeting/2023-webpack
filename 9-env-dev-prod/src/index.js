import hello from './util/hello';

//引入 图片 资源
import jpgSrc from './assets/nav.jpg';
import jpgSrc2 from './assets/jenny.jpg';
import pngSrc from './assets/img.png';
import svgSrc from './assets/logo.svg';
import txtSrc from './assets/hello.txt';

// 引入样式
import './index.css';
import './index.less';

// 引入另一个入口文件
import './another';

// 静态引入 lodash
// import _  from 'lodash';
// console.log(_.join(["lodash", "called" , "by", "index.js"], ' '));

// 动态引入 lodash
import('lodash').then(({ default: _ }) => {
    console.log(_.join(["lodash", "called" , "by", "index.js"], ' '));
})

// 静态引入 math
// import { add, minus, print } from './util/math';
// console.log("=====", add(4,5), minus(4,5), print(4,5));

// 动态引入 math
import('./util/math').then(({add, minus, print}) => {
    console.log("=====", add(4,5), minus(4,5), print(4,5));
})

// 动态引入 就会打出一个chunk来
// import('./util/hello').then(({hello}) => {
//     hello();
// })
hello();
console.log("Here is src/index.js ");


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