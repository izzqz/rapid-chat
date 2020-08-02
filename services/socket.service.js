import Logger from './logger.service.js';

/* Serves a socket for each user */
export default class SocketService {
    /**
     * @param socket {socket}
     * @param roomService {RoomService} Room service as simple DI
     */
    constructor(socket, roomService) {
        this.socket = socket;
        this.rs = roomService;

        socket.on('join-room', this.joinRoom.bind(this));
        socket.on('chat-message', this.chatMessage.bind(this));
        socket.on('disconnect', this.disconnect.bind(this));
    }

    /**
     * Connect socket to socket-io rooms
     * @param roomName {string}
     * @param username {string}
     */
    joinRoom(roomName, username) {
        this.socket.join(roomName);

        this.rs.addUserToRoom(roomName, {
            name: username,
            id: this.socket.id
        });

        this.socket.to(roomName)
            .broadcast.emit('user-connected', username);

        this.updateConnectedUsers(roomName);

        Logger.log('JOIN', `${username} has joined to "${roomName}"`);
    }

    /**
     * Emit new chat message for room
     * @param msg The message object
     * @param msg.room {string} The room name
     * @param msg.from {string} Author username
     * @param msg.text {string} Text of the message
     */
    chatMessage(msg) {
        this.socket.to(msg.room)
            .broadcast.emit('chat-message', msg);

        Logger.log('MSG', `(${msg.room})[${msg.from}]: ${msg.text}`);
    }

    /**
     * Sends an up-to-date list of online users
     * @param roomName {string}
     */
    updateConnectedUsers(roomName) {
        if (!roomName) {
            roomName = this.rs.getRoomFromUserId(this.socket.id);
        }

        const userNames = this.rs.getRoomUsernames(roomName);

        if (userNames === null) return;

        this.socket.emit('connected-users-list', userNames);
        this.socket.to(roomName).broadcast.emit('connected-users-list', userNames);
    }

    /**
     * Emit disconnect by all users in the room
     */
    disconnect() { // FIXME: Spam on page reload
        const username = this.rs.getUsernameById(this.socket.id);
        const roomName = this.rs.getRoomFromUserId(this.socket.id);

        if (username === null || roomName === null) return;

        this.rs.detachUser(this.socket.id, roomName);

        this.socket.to(roomName)
            .broadcast.emit('user-disconnected', username);

        this.updateConnectedUsers(roomName);

        Logger.log('EXIT', `${username} disconnected from "${roomName}"`);
    }
}
