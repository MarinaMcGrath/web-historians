const path = require('path');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
const url = require('url');
// require more modules/folders here!

exports.handleRequest = (req, res) => {
  let urlPath = url.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (urlPath === '/') {
      urlPath = '/index.html';
    }
    http.serveAssets(res, urlPath, (err, data) => {
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }
      if (err) { console.error(err); }
      archive.isUrlInList(urlPath, (found) => 
        found ? http.sendRedirect(res, 'loading.html', 302) : http.send404(res));
    });
  }  
  if (req.method === 'POST') {
    //req.on('data')
    //remember http://
    //isurl in list
    //is it archived
    //send redirect
    //addurl to list
    //don't use sendresponse

  }
};
