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
  fs.readFile(`${archive.paths.siteAssets}${asset}`, 'utf8', (err, data) => {
    if (err) { 
      fs.readFile(`${archive.paths.archivedSites}${asset}`, 'utf8', (err, data) => {
        if (err) {
          archive.addUrlToList(asset, exports.send404(res, cb));
        } else {
          exports.sendResponse(res, data, 200, cb);
        }
      });
    } else {
      exports.sendResponse(res, data, 200);
    }    
  });  
};

exports.sendResponse = (res, obj, status, cb) => {
  res.writeHead(status, exports.headers);
  res.end(obj);
};

exports.send404 = (res, cb) => {
  exports.sendResponse(res, '404: Page not found', 404);
};

exports.sendRedirect = (res, location, status) => {
//send to loading || send to archived
};

