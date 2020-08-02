import React from 'react';
import {Box, Grid, Heading} from 'grommet';
import {Chat as RoomIcon} from 'grommet-icons';

import './RoomPage.css';
import Chat from '../../components/Chat/Chat';

/**
 * Just Chat page
 */
export default class ChatPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: props.match.params.room
        };
    }

    render() {
        const header = (
            <Box gridArea="header" direction="row" background="brand">
                <RoomIcon color="white" className="room-icon"/>
                <Heading size="xsmall" margin="20px">{this.state.roomName}</Heading>
            </Box>
        );
        return (
            <Box className="center-block">
                <Grid
                    rows={['xxxsmall', 'small']}
                    columns={['medium', 'small']}
                    gap="small"
                    areas={[
                        {name: 'header', start: [0, 0], end: [1, 0]},
                        {name: 'chat', start: [0, 1], end: [0, 1]},
                        {name: 'users', start: [1, 1], end: [1, 1]}
                    ]}>

                    {header}

                    <Chat roomName={this.state.roomName}/>
                </Grid>
            </Box>
        );
    }
}