import './index.less';

console.log(1111);

const box = document.createElement('div');
box.textContent = '渐进式网络应用程序 Progressive Web Application:' + "\n\n" + 
 "  1)离线状态也能运行; " + "\n\n 2)添加 Work Box; " + "\n 3)注册 Service Worker; ";
box.classList.add('box');
document.body.appendChild(box);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//         .then(registration => {
//             console.log('SW registered: ', registration);
//         })
//         .catch(registrationError => {
//             console.log('SW registration failed: ', registrationError);
//         });
//     });
// }

if ('serviceWorker' in navigator){
    window.addEventListener("load", (e) => {
        console.log(e, "start ....");

        navigator.serviceWorker.register('./service-worker.js')
        .then(registration => {
            console.log("SW registered: ", registration);
        })
        .catch(error => {
            console.log("SW registered failed:  ", error);
        })
    })
}