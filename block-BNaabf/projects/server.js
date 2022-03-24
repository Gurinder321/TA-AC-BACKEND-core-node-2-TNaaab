const http = require('http');
const PORT = 5678;
const server = http.createServer(handleRequest);
const qs = require('querystring');
const fs = require('fs');

function handleRequest(req, res) {
  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });
  req.on('end', () => {
    if (req.url === '/form' && req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html');
      fs.createReadStream('./form.html').pipe(res);
    }
    if (req.url === '/form' && req.method === 'POST') {
      const parsedData = qs.parse(store);
      res.setHeader('Content-Type', 'text/html');
      res.write(`<h2>${parsedData.name}</h2>`);
      res.write(`<h3>${parsedData.email}</h3>`);
      res.write(`<p>${parsedData.age}</p>`);
      res.end();
    }
  });
}
server.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
