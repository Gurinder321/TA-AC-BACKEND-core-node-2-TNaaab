const http = require('http');
const PORT = 5678;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  if (req.method === 'GET' && req.url === '/form') {
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

  if (req.method === 'POST' && req.url === '/form') {
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
