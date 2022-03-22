console.log(__dirname);
console.log(__filename);

const { Server } = require('http');
const path = require('path');

const serverPath = path.join(__dirname + 'server.js');

console.log(serverPath);
