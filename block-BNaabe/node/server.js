// const path = require('http');

// console.log(__filename);
// console.log(__dirname + '/app.js');
// console.log('./index.html');

// const indexPath = path.join(__dirname + 'index.html');

// console.log(indexPath);

const http = require('http');
const qs = require('querystring');
const PORT = 3000;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'POST' && req.url === '/') {
    let store = '';
    req
      .on('data', (chunk) => {
        store += chunk;
      })
      .on('end', () => {
        res.statusCode = 201;
        const parsedData = qs.parse(store);
        res.end(JSON.stringify(parsedData));
      });
  }
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
