import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import path from 'path';

import RoomService from './services/room.service.js';
import SocketService from './services/socket.service.js';

const app = express();
const roomService = new RoomService();

app
    .use(express.static('frontend/build'))
    .get('*', (req, res) => {
        const indexFile = path.resolve('frontend/build/index.html');
        res.sendFile(indexFile);
    });

const HTTPServer = http.createServer(app);
const socketServer = socketIO(HTTPServer);

socketServer.on('connection', socket => {
    new SocketService(socket, roomService)
});

HTTPServer.listen(80);





/*
    Кот Феликс Ли ловец багов на службе.
    Разбудить при багах, он начнет их ловить. (Эффективность не доказана)

          |\      _,,,---,,_
    ZZZzz /,`.-'`'    -.  ;-;;,_
         |,4-  ) )-,_. ,\ (  `'-'
        '---''(_/--'  `-'\_)  Felix Lee
*/