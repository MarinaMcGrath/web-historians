const http = require('http');
const handler = require('./request-handler');
const initialize = require('./initialize.js');

// Why do you think we have this here?
// HINT: It has to do with what's in .gitignore
initialize('./archives');

const port = 8080;
const ip = '127.0.0.1';
const server = http.createServer(handler.handleRequest);
module.parent ? module.exports = server : 
  console.log(`Listening on http://${ip} : ${port}`), server.listen(port, ip);