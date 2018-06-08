import React, { Component } from 'react'
import { Grid, Cell } from 'react-mdl'

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { userId: '' };
    }
    componentDidMount = () => {
        if (this.state.userId !== this.props.location.state.userId) {
            this.setState((prevState) => {
                return { userId: this.props.location.state.userId }
            })
        }
    }
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
                            <h1>{this.state.userId}</h1>
                            <hr />
                            // About text box
                            <p>About Me: Profile Information</p>
                        </div>
                    </Cell>
                </Grid>
            </div>
        );
    }
}

export default Profile;