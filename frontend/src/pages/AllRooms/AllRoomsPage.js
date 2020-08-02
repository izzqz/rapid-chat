import React from 'react';
import {Box, Grid} from 'grommet';

import RoomsList from '../../components/RoomList/RoomsList';

/**
 * The page where there is a list of all rooms for the user
 */
export default class AllRoomsPage extends React.Component {
    render() {
        return (
            <Box className="center-block">
                <Grid
                    rows={['xxsmall', 'small']}
                    columns={['medium']}
                    gap="small"
                    areas={[
                        {name: 'header', start: [0, 0], end: [1, 0]},
                        {name: 'rooms', start: [0, 1], end: [1, 1]}
                    ]}>

                    <RoomsList/>
                </Grid>
            </Box>
        );
    }
}