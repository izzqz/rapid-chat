import React from 'react';
import {Grommet} from 'grommet';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import WelcomePage from './pages/Welcome/WelcomePage.js';
import ChatPage from './pages/Room/RoomPage.js';
import AllRoomsPage from './pages/AllRooms/AllRoomsPage.js';

/* Grommet theme settings */
const theme = {
    global: {
        colors: {
            brand: '#3b4d65',
            focus: '#c6c6c6'
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px'
        }
    }
};

export default class App extends React.Component {
    state = {};

    render() {
        return (
            <Router>
                <Grommet theme={theme} full>
                    <Switch>
                        <Route path="/" exact component={WelcomePage}/>
                        <Route path="/rooms" component={AllRoomsPage}/>
                        <Route path="/r/:room" component={ChatPage}/>
                        <Route render={() => <h1>404: page not found</h1>}/>
                    </Switch>
                </Grommet>
            </Router>
        );
    }
}
