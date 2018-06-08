import React, { Component } from 'react'
import { Grid, Cell } from 'react-mdl'

class Profile extends Component {
    render() {
        return (
            <div style={{ width: '100%', margin: 'auto' }}>
                <Grid className="profileGrid">
                    <Cell col={12}>
                        <img
                            // Profile image
                            src="https://www.w3schools.com/howto/img_avatar.png"
                            alt="profilePicture"
                            className="profileImage"
                        />
                        <div className="bannerText">
                            // Profile name
                            <h1>Michael Lee</h1>
                            <hr />
                            // About text box
                            <p>About Me: PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA
            PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA PANDA </p>
                        </div>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default Profile;