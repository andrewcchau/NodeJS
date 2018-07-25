const PORT = 9000;

var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let htmlPath = path.join(__dirname, '..', 'index.html');
    let scriptPath = path.join(__dirname, 'script.js');
    let cssPath = path.join(__dirname, '..', 'css', 'styles.css');

    console.log("Received request for " + pathname);

    // router for requests
    if(pathname == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var html = fs.readFileSync(htmlPath);
        res.write(html);
    } else if(pathname == "/js/script.js") {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        var script = fs.readFileSync(scriptPath);
        res.write(script);
    } else if(pathname == "/css/styles.css") {
        res.writeHead(200, {'Content-Type': 'text/css'});
        var css = fs.readFileSync(cssPath);
        res.write(css);
    }

    res.end();
}).listen(PORT);

console.log('Server running at http://localhost:9000/');