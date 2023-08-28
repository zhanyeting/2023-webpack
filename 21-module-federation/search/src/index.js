Promise.all([import('nav/Header'), import('home/HomeList')])
.then(([Header, {HomeList}]) => {   // HomeList 是 export 函数导出方式
    document.body.appendChild(Header.default());
    document.body.innerHTML += HomeList(8);   // HomeList 返回的dom字符串
})

// const Header = await import('nav/Header');
// const HomeList = await import('home/HomeList');

// console.log(HomeList());
// document.body.appendChild(Header.default())