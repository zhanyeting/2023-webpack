/**
有时我们需要在客户端进行大量的运算，但又不想让它阻塞我们的js主线程。
你可能第一时间考虑到的是异步。
但事实上，运算量过大(执行时间过长)的异步也会阻塞js事件循环，
甚至会导致浏览器假死状态。
这时候，HTML5的新特性 WebWorker就派上了用场。

html5之前，打开一个常规的网页，浏览器会启用几个线程？
一般而言，至少存在三个线程(公用线程不计入在内):
分别是js引擎线程(处理js)、GUI渲染线程(渲染页面)、浏览器事件触发线程(控制交互)。

当一段JS脚本长时间占用着处理机,就会挂起浏览器的GUI更新，而后面的
事件响应也被排在队列中得不到处理，从而造成了浏览器被锁定进入假死状态。
现在如果遇到了这种情况，我们可以做的不仅仅是优化代码————html5提供了解
决方案，webworker。
webWorkers提供了js的后台处理线程的API，它允许将复杂耗时的单纯js逻辑处理放
在浏览器后台线程中进行处理，让js线程不阻塞UI线程的渲染。
多个线程间也是可以通过相同的方法进行数据传递。

它的使用方式如下：
    //new Worker(scriptURL: string | URL, options?: WorkerOptions)
    new Worker("someWorker.js");
也就是说，需要单独写一个js脚本，然后使用new Worker来创建一个Work线程实例。
这意味着并不是将这个脚本当做一个模块引入进来，而是单独开一个线程去执行这个脚本
*/

const worker = new Worker(new URL('./work.js', import.meta.url)); 
// import.meta.url: 这个参数能够锁定我们当前的这个模块——注意，它不能在commonjs中使用
worker.postMessage({
    question: 'how much wokers you have?'
});
console.log(1111);

worker.onmessage = ({data: {answer}}) => {
    console.log("answer: ", answer);
}

/**
这时候我们执行打包命令，会发现,dist目录下除了bundle.js之外，
还有另外一个xxx.bundle.js!
这说明我们的webpack5自动的将被new Work使用的脚本单独打出了一个bundle。
我们加上刚才的问答代码，执行npm run dev，发现它是能够正常工作。
并且在network里也可以发现多了一个src_worker_js.bundle.js
 */