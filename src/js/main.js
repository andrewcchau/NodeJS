const PORT = 9000;

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');


http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var htmlPath = path.join(__dirname, '..', 'index.html');
    var scriptPath = path.join(__dirname, 'script.js');

    res.writeHead(200, {'Content-Type': 'text/html'});

    // router for requests
    if(pathname == "/") {
        var html = fs.readFileSync(htmlPath);
        res.write(html);
    } else if(pathname == "/js/script.js") {
        var script = fs.readFileSync(scriptPath);
        res.write(script);
    }

    res.end();
}).listen(PORT);

console.log('Server running at http://localhost:9000/');