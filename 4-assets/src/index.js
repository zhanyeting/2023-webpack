import helloworld from "./helloworld";
import imgSrc from './assets/img-1.png';
import svgSrc from './assets/webpack-logo.svg';
import txtSrc from './assets/hello.txt';
import jpgSrc from './assets/qianfeng-sem.jpg';

helloworld(); 

console.log("here is index file! ");

const pngEle = document.createElement('img');
pngEle.src = imgSrc;
document.body.appendChild(pngEle);


const svgEle = document.createElement('img');
svgEle.style.cssText = 'width: 200px; height: 100px;';
svgEle.src = svgSrc;
document.body.appendChild(svgEle);


const txtEle = document.createElement('div');
txtEle.style.cssText = "width: 200px; height: 200px; background: pink; color: blue; ";
txtEle.textContent = txtSrc;
document.body.appendChild(txtEle);

const jpgEle = document.createElement('img');
jpgEle.style.cssText = "width: 600px; height: 250px; ";
jpgEle.src = jpgSrc;
document.body.appendChild(jpgEle);
