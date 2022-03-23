const http = require('http');
const qs = require('querystring');
const PORT = 7000;

const server = http.createServer(handleRequest);

function handleRequest(req, res) {
  const dataFormat = req.headers['content-type'];

  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    if (dataFormat === 'application/json') {
      const parsedData = JSON.parse(store);
      res.end(store);
    }
    if (dataFormat === 'application/x-www-form-urlencoded') {
      const parsedData = qs.parse(store);

      res.end(JSON.stringify(parsedData));
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
