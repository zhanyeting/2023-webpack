// import './index.css';
import './common.global.css';

// 在 css-loader 中配置了 modules: true 后，表示开启了 css 模块，
// 需要按照模块的方式导入 css样式了
import style from './index.css';

const box = document.createElement('div');

box.classList.add(style.box);

box.textContent = 'hello postcss';
document.body.appendChild(box);

const pinkBox = document.createElement('div');
pinkBox.classList.add('pinkBox');
pinkBox.textContent = 'hello pinkBox';
document.body.appendChild(pinkBox);


