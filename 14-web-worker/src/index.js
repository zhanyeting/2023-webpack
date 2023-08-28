console.log(1111);

const worker = new Worker(new URL('./work.js', import.meta.url));
worker.postMessage({
    question: 'how much wokers you have?'
});

worker.onmessage = ({data: {answer}}) => {
    console.log("answer: ", answer);
}