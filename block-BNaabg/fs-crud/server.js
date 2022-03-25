const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = 8000;
const server = http.createServer(handleRequest);

const usersPath = __dirname + '/users/';

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);

  let store = '';
  req.on('data', (chunk) => {
    store += chunk;
  });

  req.on('end', () => {
    //  Handle all of our routes
    if (req.url === '/users' && req.method === 'POST') {
      const username = JSON.parse(store).username;
      fs.open(usersPath + username + '.json', 'wx', (err, fd) => {
        if (err) return console.log(err);
        fs.writeFile(fd, store, (err) => {
          if (err) return console.log(err);
          fs.close(fd, () => {
            return res.end(`${username} created successfully`);
          });
        });
      });
    }

    if (parsedUrl.pathname === '/users' && req.method === 'GET') {
      let username = parsedUrl.query.username;
      fs.readFile(usersPath + username + '.json', (err, content) => {
        if (err) return console.log(err);
        res.setHeader('content-type', 'application/json');

        return res.end(content);
      });
    }

    if (parsedUrl.pathname === '/users' && req.method === 'PUT') {
      let username = parsedUrl.query.username;
      fs.open(usersPath + username + '.json', 'r+', (err, fd) => {
        if (err) return console.log(err);
        fs.ftruncate(fd, (err) => {
          if (err) return console.log(err);
          fs.writeFile(fd, store, (err) => {
            if (err) return console.log(err);
            fs.close(fd, () => {
              return res.end(`${username} was updated successfully`);
            });
          });
        });
      });
    }
    if (parsedUrl.pathname === '/users' && req.method === 'DELETE') {
      let username = parsedUrl.query.username;
      fs.unlink(usersPath + username + '.json', (err) => {
        if (err) return console.log(err);
        return res.end(`${username} has been deleted`);
      });
    }

    res.statuscode = 404;
    res.end('Page Not Found!');
  });
}

server.listen(PORT, () => {
  console.log(`Server is listening on PORT ${PORT}`);
});
