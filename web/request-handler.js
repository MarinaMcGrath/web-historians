const path = require('path');
const archive = require('../helpers/archive-helpers');
const http = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = (req, res) => {
  res.end(archive.paths.list);
};
