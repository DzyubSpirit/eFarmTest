var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req, res) {
	var urlParsed = url.parse(req.url, true);
	var filename;
	if (urlParsed.query['uri']) {
		filename = 'www'+path.sep+encodeURIComponent(urlParsed.query['uri']);
	} else {
		filename = '.'+urlParsed.pathname;
	}
	// console.log(filename);
	fs.access(filename, (err) => {
		if (err) {
			res.statusCode = 404;
			res.end('No file');
			return;
		}
		fs.readFile(filename, function(err, data) {
			if (err) throw err;
			res.end(data);
		});
	})
}).listen(8080);