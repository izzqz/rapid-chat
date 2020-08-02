import React from 'react';
import {Box, Markdown, Text, TextInput} from 'grommet';
import {Send, User} from 'grommet-icons';

import './Chat.css';
import socket from '../../utils/socket.js';

/**
 * Full-featured chat component
 */
export default class Chat extends React.Component {
    /**
     * @param props.roomName {string} The room name
     */
    constructor(props) {
        super(props);

        /**
         * @type {{inputValue: string, messages: [{from: string, room: string, text: string}], connectedUsers: [string], roomName: string, username: string}}
         */
        this.state = {
            roomName: props.roomName,
            username: localStorage.getItem('username') || this.authorizeNewUser(),
            connectedUsers: [],
            inputValue: '',
            messages: []
        };

        // From js with ❤
        this.sendMessage = this.sendMessage.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
        this.newChatMessage = this.newChatMessage.bind(this);
        this.sendLocalRoomMessage = this.sendLocalRoomMessage.bind(this);
        this.updateConnectedUsers = this.updateConnectedUsers.bind(this);
    }

    /* Socket connection */
    componentDidMount() {
        socket.on('user-connected', username => {
            this.sendLocalRoomMessage(`=> **${username}** has been connected...`);
        });

        socket.on('user-disconnected', username => {
            this.sendLocalRoomMessage(`<= **${username}** has been disconnected`);
        });

        socket.on('chat-message', this.newChatMessage);
        socket.on('connected-users-list', this.updateConnectedUsers);


        socket.on('connect', () => {
            socket.emit('join-room', this.state.roomName, this.state.username);
            this.sendLocalRoomMessage('=> **You** has been connected');
        });

        socket.on('error', e => {
            console.error('Socket Error:', e);
            alert('Socket error');
        });
    }

    componentWillUnmount() {
        socket.removeAllListeners();
    }

    /**
     * If the user is not authorized in the system he will see this prompt
     * @return {string} Username from prompt
     */
    authorizeNewUser() {
        let username;
        const requestUsername = () => username = prompt('Enter your name');
        requestUsername();

        while (username === null || username.trim() === '') {
            alert('Username must contain at least one character');
            requestUsername();
        }

        localStorage.setItem('username', username);
        return username;
    }

    /**
     * @param userNames {Array<string>} Users list
     */
    updateConnectedUsers(userNames) {
        this.setState({
            connectedUsers: userNames
        });
    }

    /**
     * @param target {onkeypress}
     */
    handleEnterKeyPress(target) {
        if (target.charCode === 13) this.sendMessage();
    }

    /**
     * @param e {event}
     */
    handleInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    /**
     * @param msg {string} The system message
     */
    sendLocalRoomMessage(msg) {
        this.newChatMessage({
            from: ' ',
            text: msg
        });
    }

    /**
     * Adds a new message to the state
     * @param msg {{from: string, text: string, room: string}} Message object from user
     */
    newChatMessage(msg) {
        const allExistMessages = this.state.messages;
        this.setState({
            messages: [...allExistMessages, msg]
        });
    }

    /**
     * Sends a new message from the input
     */
    sendMessage() {
        if (this.state.inputValue === '') return; // Empty input

        const msg = {
            room: this.state.roomName,
            text: this.state.inputValue,
            from: this.state.username
        };

        socket.emit('chat-message', msg);

        this.newChatMessage(msg);

        this.setState({
            inputValue: ''
        });
    }

    render() {
        const allMessages = this.state.messages
            .map((msg, i) => {
                const username = <span style={{color: msg.color}}>[{msg.from}]</span>;

                return (
                    <Text key={i}>{username}: <Markdown>{msg.text}</Markdown></Text>
                );
            });

        const allUsers = this.state.connectedUsers.map((name, i) => {
            return (
                <Box key={i} direction="row" className="user-card">
                    <User color="#3b4d65"/>
                    <span className="username"><strong>{name}</strong></span>
                </Box>

            );
        });

        return (
            <>
                <Box gridArea="chat" direction="column" className="chat-component">
                    <Box
                        direction="column"
                        className="chat-messages"
                    >
                        {allMessages}
                    </Box>

                    <Box direction="row" className="user-input">
                        <TextInput
                            placeholder="Message..."
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            onKeyPress={this.handleEnterKeyPress}
                        />
                        <Send
                            color="#3b4d65"
                            className="send-icon"
                            onClick={this.sendMessage}
                        />
                    </Box>
                </Box>
                <Box direction="column" gridArea="users">
                    {allUsers}
                </Box>
            </>
        );
    }
}