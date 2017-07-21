const archive = require('../helpers/archive-helpers.js');
// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
archive.readListOfUrls(archive.downloadUrls);