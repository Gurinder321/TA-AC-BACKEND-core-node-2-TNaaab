const http = require('http');
const qs = require('querystring');
const PORT = 4000;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  let store = '';
  console.log(req.headers['content-type']);

  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      const formData = qs.parse(store);
      res.setHeader('content-type', 'text/html');
      res.end(`<h2>${formData.name}</h2><p>${formData.email}</p>`);
    }
    if (req.headers['content-type'] === 'application/json') {
      const jsonData = JSON.parse(store);
      res.setHeader('content-type', 'text/html');
      res.end(`<h2>${jsonData.name}</h2><p>${jsonData.email}</p>`);
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
