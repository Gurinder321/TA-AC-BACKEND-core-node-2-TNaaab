const http = require('http');

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
    function handleRequest(req, res) {
        if (req.method === 'POST' && req.url === '/') {
          res.setHeader('Content-type', 'text/plain');
          res.end('Gurinder');
        }
        res.write
}

server.listen(3456);
