const path = require('path');
const archive = require('../helpers/archive-helpers');
const httpHelp = require('./http-helpers.js');
const url = require('url');
const request = require('request');
// require more modules/folders here!

exports.handleRequest = (req, res) => {
  let urlPath = url.parse(req.url).pathname;
  if (req.method === 'GET') {
    if (urlPath === '/') {
      urlPath = '/index.html';
    }
    httpHelp.serveAssets(res, urlPath, (err, data) => {
      if (urlPath[0] === '/') { urlPath = urlPath.slice(1); }
      if (err) { console.error(err); }
      archive.isUrlInList(urlPath, (found) => 
        found ? httpHelp.sendRedirect(res, 'loading.html', 302) : httpHelp.send404(res));
    });
  }  
  if (req.method === 'POST') {
    req.on('data', (response) => {
      let resUrl = response.toString('utf8').split('=')[1].replace('http://', '');
      archive.isUrlInList(resUrl, (inList) => {
        if (inList) {
          archive.isUrlArchived(resUrl, (isArchived) => {
            if (isArchived) {
              httpHelp.sendRedirect(res, '/' + resUrl, 200);
            } else {
              httpHelp.sendRedirect(res, '/loading.html', 302);
            }
          });
        } else {
          console.log(resUrl);
          archive.addUrlToList(`${resUrl}\n`, (resUrl) => {
            httpHelp.sendRedirect(res, '/loading.html', 302);
          });
        }
      }); 
    });
  }
};
