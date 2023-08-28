import { HomeList } from "./homeList";

// 模块联邦导入的模块，只能 动态导入
import('nav/Header').then(Header => {
    // console.log(Header);
    document.body.appendChild(Header.default());

    const box = document.createElement('div');
    box.innerHTML = HomeList(6);
    document.body.append(box);
})
