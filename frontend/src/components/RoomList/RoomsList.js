import React from 'react';
import {Anchor, Box, Heading, Text} from 'grommet';
import {Add, Chat, Trash} from 'grommet-icons';

import './RoomsList.css';

/**
 * List of all user rooms with the ability to delete and add rooms
 */
export default class RoomsList extends React.Component {
    constructor(p) {
        super(p);

        const savedRooms = localStorage.getItem('rooms');

        /**
         * @type {{rooms: [string]}}
         */
        this.state = {
            rooms: savedRooms ? JSON.parse(savedRooms) : []
        };

        this.addNewRoom = this.addNewRoom.bind(this);
        this.saveRooms = this.saveRooms.bind(this);
    }

    saveRooms() {
        localStorage.setItem('rooms', JSON.stringify(this.state.rooms));
    }

    addNewRoom() {
        const newRoomName = prompt('Enter room name');

        if (newRoomName === '' || newRoomName === null) return; // User cancel prompt

        this.setState({
            rooms: [...this.state.rooms, newRoomName]
        });
    }

    /**
     * Returns a function that removes a specific room
     * @param roomToDelete
     * @return {function(...[*]=)}
     */
    deleteRoom(roomToDelete) {
        return () => {
            this.setState({
                rooms: this.state.rooms.filter(room => room !== roomToDelete)
            });
        };
    }

    render() {
        const header = (
            <Box
                gridArea="header"
                direction="row"
                background="brand"
            >
                <Heading className="flex" size="small" margin="6px">Rooms</Heading>
                <Add
                    className="add-button"
                    color="white"
                    onClick={this.addNewRoom}
                />
            </Box>
        );

        if (this.state.rooms.length === 0) {
            return (
                <>
                    {header}
                    <Box gridArea="rooms">
                        <Box direction="column">
                            <Text>You don't have rooms yet, click the plus to add</Text>
                        </Box>
                    </Box>
                </>
            );
        }

        const allRooms = this.state.rooms.map((roomName, i) => {
            return (
                <Box
                    direction="row"
                    pad={{bottom: 'medium'}}
                    key={i}
                    className="room"
                >
                    <Anchor
                        icon={<Chat/>}
                        size="large"
                        href={`/r/${roomName}`}
                        label={roomName}
                        className="flex"
                    />
                    <Trash
                        className="delete-icon"
                        onClick={this.deleteRoom(roomName)}
                    />
                </Box>
            );
        });

        this.saveRooms();

        return (
            <>
                {header}
                <Box gridArea="rooms">
                    <Box direction="column">
                        {allRooms}
                    </Box>
                </Box>
            </>
        );
    }
}