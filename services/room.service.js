export default class RoomService {
    state = [];

    getRoom(name) {
        let foundRoom = null;

        this.state.forEach(room => {
            if (room.name === name) {
                foundRoom = room;
            }
        });

        return foundRoom;
    }

    getRoomUsernames(roomName) {
        const index = this.getRoomIndex(roomName);

        if (index === -1) return null;

        return this.state[index].users.map(user => user.name);
    }

    getRoomIndex(name) {
        return this.state.findIndex(room => room.name === name);
    }

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

    detachRoom(index) {
        this.state.splice(index, 1);
    }
}