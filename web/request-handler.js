const path = require('path');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
const url = require('url');
// require more modules/folders here!

exports.handleRequest = (req, res) => {
  let urlPath = url.parse(req.url).pathname;
  if (req.method === 'GET') {
    http.serveAssets(res, urlPath, (err, data) => {
      if (err) { console.error(err); }
      
    });
  }  
  if (req.method === 'POST') {
  }
};
