/**
 * Service for managing user rooms
 */
export default class RoomService {
    /**
     * @type {[{
     *     name: string The room name
     *     users: [{
     *         name: string Username
     *         id: string Socket Id from socket io
     *     }]
     * }]}
     */
    state = [];

    /**
     * Finds the room the user is in
     * @param name
     * @return {null|string}
     */
    getRoom(name) {
        let foundRoom = null;

        this.state.forEach(room => {
            if (room.name === name) {
                foundRoom = room;
            }
        });

        return foundRoom;
    }

    /**
     * Returns all users in a room by name
     * @param roomName
     * @return {null|[string]}
     */
    getRoomUsernames(roomName) {
        const index = this.getRoomIndex(roomName);

        if (index === -1) return null;

        return this.state[index].users.map(user => user.name);
    }

    /**
     * Returns room index by room name
     * @param name The room name
     * @return {number} index in state
     */
    getRoomIndex(name) {
        return this.state.findIndex(room => room.name === name);
    }

    /**
     * @param roomName {string}
     * @param user {{name: string, id: string}} The user object
     */
    addUserToRoom(roomName, user) {
        let room = this.getRoom(roomName);

        if (room === null) {
            room = {
                name: roomName,
                users: [user]
            };

            this.state.push(room);
        } else { // Room already exists
            const index = this.getRoomIndex(roomName);
            this.state[index].users.push(user);
        }
    }

    /**
     * @param id {string} id from socket io
     * @return {null|string}
     */
    getRoomFromUserId(id) {
        let userRoom = null;

        this.state.forEach(room => {
            room.users.forEach(user => {
                if (user.id === id) {
                    userRoom = room.name;
                }
            });
        });

        return userRoom;
    }

    /**
     * @param id {string} id from socket io
     * @return {null|string}
     */
    getUsernameById(id) {
        let foundUsername = null;

        this.state.forEach(room => {
            room.users.forEach(user => {
                if (user.id === id) {
                    foundUsername = user.name;
                }
            });
        });

        return foundUsername;
    }

    /**
     * Detach the user from the room, used when disconnecting
     * @param id {string} id from socket io
     * @param roomName
     */
    detachUser(id, roomName) {
        const index = this.getRoomIndex(roomName);

        if (index === -1) return; // Room dont exists

        this.state[index].users = this.state[index].users.filter(user => {
            return user.id !== id;
        });

        if (this.state[index].users.length === 0) { // Room dont have users
            this.detachRoom(roomName);
        }
    }

    /**
     * Delete the room from state, used when room don't have users
     * @param index {number} The room index in state
     */
    detachRoom(index) {
        this.state.splice(index, 1);
    }
}