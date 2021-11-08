// * Пользователи должны видеть не только сообщение о подключении нового клиента, 
// но и об отключении клиента или переподключении;
// * На странице приложения необходимо различать сообщения от разных клиентов. 
// Для этого генерируйте ник пользователя при его каждом его подключении;
// * Пользователи должны видеть сообщения серверу, которые 
// были посланы другими пользователями.

const socket = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');
const port = 5555;

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, 'index.html');
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

let clients = 0;

io.on('connection', client => {
    const names = ['Петр', 'Сосед', 'Тёща', 'Сергей', 'Виктория', 'Пятничная незнакомка'];
    let randomName = names[Math.floor(Math.random() * (names.length - 0) + 0)];

    clients++;
    io.sockets.emit('broadcast',{ description: `${clients} clients online! Последний зашёл ${randomName}`});
    client.on('disconnect', () => {
        clients--;
        io.sockets.emit('broadcast',{ description: `${clients} clients online! ${randomName} покинул чат`});
    });

    console.log(`New user ${randomName} connected!`);

    client.on('client-msg', data => {
        const payload = {
            author: randomName,
            message: data.message.split('').join(''),
        };

        client.broadcast.emit('server-msg', payload);
        client.emit('server-msg', payload);
    });

    client.on('disconnect', () => {
        console.log(`A user ${randomName} disconnected`);
    });
});

server.listen(port);
