const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req.url);
    if (req.url === '/home') {
        res.end('/home');
        return;
    }
    res.end("hello, this is server! result = "+req.url);
});

server.listen(3000, () => {
    console.log("server start.....");
})