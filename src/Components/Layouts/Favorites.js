import React, { Component } from 'react'
import firebase from '../../firebase.js';

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            liked: [],
            disliked: []
        };
    }
    componentDidMount = () => {
        if (this.state.userId !== this.props.location.state.userId) {
            firebase.database().ref('/users/' + this.props.location.state.userId).once('value').then((snapshot) => {
                this.setState({
                    liked: snapshot.val().liked,
                    disliked: snapshot.val().disliked,
                    userId: this.props.location.state.userId
                })
            })
        }
    }
    render() {
        return (
            <div>
                <h1>Liked</h1>
                {this.state.liked.map((recipes) =>
                    <span>{recipes} <br/> </span>
                )}
                <h2>Disliked</h2>
                {this.state.disliked.map((recipes) =>
                    <span>{recipes} <br /></span>
                )}
            </div>
        );
    }
}

export default Favorites;