import React from 'react';
import {Box, Grid, Heading} from 'grommet';

import './WelcomePage.css';
import RegisterForm from '../../components/RegisterForm';
import {ChatOption} from 'grommet-icons';

export default class WelcomePage extends React.Component {
    render() {
        /**
         * Grid component
         * @see https://v2.grommet.io/grid
         *
         * Box component
         * @see https://v2.grommet.io/box
         *
         * Heading component
         * @see https://v2.grommet.io/heading
         */
        return (
            <Box className="center-block">
                <Grid
                    rows={['xsmall', 'small']}
                    columns={['small', 'medium']}
                    gap="small"
                    areas={[
                        {name: 'header', start: [0, 0], end: [1, 0]},
                        {name: 'form', start: [0, 1], end: [0, 1]},
                        {name: 'main', start: [1, 1], end: [1, 1]}
                    ]}
                >
                    <Box gridArea="header" direction="row" background="brand">
                        <ChatOption color="white" className="improvised-logo"/>
                        <Heading size="medium" margin="20px">Rapid Chat</Heading>
                    </Box>

                    <RegisterForm/>

                    <Box gridArea="main">
                        <ol className="main-list">
                            <li>Enter your name</li>
                            <li>Create chat room</li>
                            <li>Share link room</li>
                            <li>Welcome to rapid chat!</li>
                        </ol>
                    </Box>
                </Grid>
            </Box>
        );
    }
}