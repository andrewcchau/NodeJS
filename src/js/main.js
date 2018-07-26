const PORT = 9000;

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
    let pathname = url.parse(req.url).pathname;
    let htmlPath = path.join(__dirname, '..', 'index.html');
    let scriptPath = path.join(__dirname, '..', '..', 'dist', 'js', 'bundle.js');
    let cssPath = path.join(__dirname, '..', '..', 'dist', 'css', 'styles.css');

    console.log("Received request for " + pathname);

    // router for requests
    if(pathname == "/") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        let html = fs.readFileSync(htmlPath);
        res.write(html);
    } else if(pathname == "/js/bundle.js") {
        res.writeHead(200, {'Content-Type': 'text/javascript'});
        let script = fs.readFileSync(scriptPath);
        res.write(script);
    } else if(pathname == "/css/styles.css") {
        res.writeHead(200, {'Content-Type': 'text/css'});
        let css = fs.readFileSync(cssPath);
        res.write(css);
    }

    res.end();
}).listen(PORT);

console.log('Server running at http://localhost:9000/');