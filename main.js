const fs = require('fs');
const ACCESS_LOG = './a.log';
const IP89_LOG = './ip-89.123.1.41_requests.log';
const IP34_LOG = './ip-34.48.240.111_requests.log';

let readableStream  = fs.createReadStream(ACCESS_LOG, 'utf8');
let writeableStream89 = fs.createWriteStream(IP89_LOG);
let writeableStream34 = fs.createWriteStream(IP34_LOG);

let regExp89 = new RegExp('89.123.1.41', 'g');
let regExp34 = new RegExp('34.48.240.111', 'g');

readableStream.on('data', (chunk) => {
    const transformed89 = chunk.match(regExp89);
    writeableStream89.write(transformed89.toString());
    // fs.writeFile(
    //     IP89_LOG,
    //     transformed89.toString(),
    //     {
    //         encoding: 'utf-8',
    //         flag: 'a',
    //     },
    //     (err) => {
    //         if (err) console.log(err);
    //     }
    // )

    const transformed34 = chunk.toString().match(regExp34);
    writeableStream34.write(transformed34.toString());
    // fs.writeFile(
    //     IP34_LOG,
    //     transformed34.toString(),
    //     {
    //         encoding: 'utf-8',
    //         flag: 'a',
    //     },
    //     (err) => {
    //         if (err) console.log(err);
    //     }
    // )
});

