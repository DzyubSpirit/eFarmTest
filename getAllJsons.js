var http = require('http');
var fs = require('fs');

var baseURL = 'http://dev.efarmer.mobi:8080/RESTService/RESTService/preview/document?uri=';

var fileOptions = {
	flags: 'w',
	defaultEncoding: 'utf8',
	fd: null,
	mode: 0o666,
	autoClose: true
};
var regExpForContentURIs = /"content:\/\/[^"]*"/g;
var	urls = [    
	'content://TRACK/d3ababca-4ad0-43c2-aef4-31f723d22b0b',
    'content://TRACK/d74a42f4-dea7-4b08-a6ac-814738d6d9fc',
    'content://TRACK/f0903ea1-a4ef-4709-a910-44d5206a864e',
    'content://TRACK/e653f518-af71-4e8a-84d0-c26208543e25',
    'content://TRACK/8fe5d598-7ebc-47a7-ac8e-3eee86397c3d',
    'content://TRACK/7f10fce2-18cb-4e5d-a9b4-ff99a334bbd4',
    'content://TRACK/810a37ea-d390-4539-b261-1106c2cc7579']

var checkedUrls = {};


function saveContentFrom(curUrl) {
	if (checkedUrls[curUrl]) {
		return;
	} else {
		checkedUrls[curUrl] = 1;
	}
	console.log(curUrl);
	var reqURL = baseURL+curUrl;
	var req = http.get(reqURL, (res) => {
		var writeStream = fs.createWriteStream('www/'+encodeURIComponent(curUrl), fileOptions)
		res.pipe(writeStream);
		res.on('data', (chunk) => {
			var newURIs = chunk.toString().match(regExpForContentURIs);
			if (newURIs) {
				newURIs.map((href) => {
					return href.slice(1,-1);
				}).forEach(saveContentFrom);
			}
		});

	});

	req.on('error', (e) => {
	  console.log(i+' '+`problem with request: ${e.message}`);
	});
}

for (var i = 0; i < urls.length; i++) {
	saveContentFrom(urls[i]);
}