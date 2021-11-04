const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 8080;

const header = `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Directory list</title>
            <link rel="icon" type="image/x-icon" href="/favicon.ico"/>
        </head>
        <body>
        <header>
            <h1>Directory list</h1>
        </header>
        <main>
            <div id="listing">`;

const footer = `</div>
            </main>
        </body>
    </html>`;

let content = ``;

const isFile = (path) => fs.lstatSync(path).isFile();

const server = http.createServer((req, res) => {
    if (req.url === '/favicon.ico') {
        res.writeHead(200, {
            "Content-Type": 'image/x-icon',
        });
        res.end();
        return;
    }
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    let anyPath = req.url !== '' ? req.url : '';
    const fullPath = path.join(process.cwd(), anyPath);

    if(isFile(fullPath)) {
        content = fs.readFileSync(fullPath, 'utf-8');
    } else {
        const list = fs.readdirSync(fullPath);
        let chunkURL = req.url;
        let up = '';

        if (chunkURL.length > 1) {
            chunkURL += '/';
            const backUrl = '/' + chunkURL.split('/').slice(1, -2).join('/');
            up = `<li><a href='${backUrl}'>..</a></li>`;
        }

        content = `<ul>${up}`;
        for (let i = 0; i < list.length; i++) {
            content += `<li><a href='${chunkURL}${list[i]}'>${list[i]}</a></li>`;
        }
        content += '</ul>';
    }

    res.end(header + content + footer);
}).listen(port);

