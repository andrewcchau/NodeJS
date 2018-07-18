const PORT = 9000;

var http = require('http');
var fs = require('fs');
var path = require('path');

var htmlPath = path.join(__dirname, '..', 'index.html');

fs.readFile(htmlPath, function (err, html) {

    if (err) throw err;

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(html);
        res.end();
    }).listen(PORT);
});

console.log('Server running at http://localhost:9000/');