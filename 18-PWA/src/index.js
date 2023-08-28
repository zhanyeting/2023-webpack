console.log("hello 离线换缓存 - service worker");

if ("serviceWorker" in navigator){
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("service-worker.js")
        .then(registration => {
            console.log("SW 注册成功： ", registration );
        })
        .catch(error => {
            console.log(" SW 注册失败： ", error);
        })
    })
}