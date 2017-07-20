const path = require('path');
const fs = require('fs');
const archive = require('../helpers/archive-helpers');
const http = require('http');
exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


exports.serveAssets = (res, asset, cb) => {
  let statusCode = 200;
  fs.readFile(`${archive.paths.siteAssets}${asset}`, 'utf8', (err, data) => {
    if (err) { 
      fs.readFile(`${archive.paths.archivedAssets}${asset}`, 'utf8', (err, data) => {
        if (err) {
          exports.send404(err);
        } else {
          exports.sendResponse();
        }
      });
    } else {
      exports.sendResponse();
    }    
  });  

};

exports.sendResponse = (res, obj, status) => {
  res.writeHead(statusCode, exports.headers);
  res.end(obj);
};

exports.send404 = (res) => {
  exports.sendResponse(res, '404: Page not found', 404);
};

exports.sendRedirect = (res, location, status) => {
//send to loading || send to archived
};

