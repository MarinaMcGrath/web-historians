const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const http = require('http');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public/'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = pathsObj => {
  _.each(pathsObj, (path, type) => exports.paths[type] = path);
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = cb => fs.readFile(exports.paths.list, 'utf8', (err, sites) => {
  err ? console.error(err) : cb(sites.split('\n'));
});

exports.isUrlInList = (url, cb) => exports.readListOfUrls(sites => cb(sites.includes(url)));

exports.addUrlToList = (url, cb) => fs.appendFile(exports.paths.list, url, 'utf8', cb);

exports.isUrlArchived = (url, cb) => fs.readdir(exports.paths.archivedSites, 'utf8', (err, files) => {
  err ? console.error(err) : cb(files.includes(url));
});

exports.downloadUrls = urls => urls.forEach(url => exports.isUrlArchived(url, val => {
  if (!val) {
    let site = `${exports.paths.archivedSites}/${url}`;
    fs.mkdir(site);
    fs.writeFile(`${site}/index.html`);
    http.get({'url': url}, `${site}/index.html`, (err, res) => {
      err ? console.log(err) : console.log(res.code, res.header, res.file);
    });
  }
}));    

