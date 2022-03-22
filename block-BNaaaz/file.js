const { fstat } = require('fs');
const http = require('http');
const fs = require('fs');
const PORT = 5000;
const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/') {
    res.setHeader('Content-type', 'text/html');
    fs.createReadStream('./readme.txt').pipe(res);
  }
}

server.listen(PORT);
