import React, { Component } from 'react'
import firebase from '../../firebase.js';
import Popup from 'reactjs-popup';

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
                let likedDB = snapshot.val().liked;
                let dislikedDB = snapshot.val().disliked;
                firebase.database().ref('/recipes').once('value').then((snapshot) => {
                    var dislikedHold = [];
                    var likedHold = [];
                    for (var i = 0; i < snapshot.val().length; i++) {
                        if (dislikedDB.includes(snapshot.val()[i].name)) {
                            console.log('gang')
                            dislikedHold.push(snapshot.val()[i])
                        }
                        if (likedDB.includes(snapshot.val()[i].name)) {
                            likedHold.push(snapshot.val()[i])
                        }
                    }
                    this.setState({
                        liked: likedHold,
                        disliked: dislikedHold,
                        userId: this.props.location.state.userId
                    })
                })
            })
        }
    }
    render() {
        console.log(this.state.liked + this.state.disliked)
        return (
            <div>
                <h1>Liked</h1>
                {this.state.liked.map((recipes) => <Popup
                    trigger={<button className="button">{recipes.name}</button>}
                    modal
                >
                    <div className="modal">
                        <div className="btnGroupButton">
                        </div>
                        <h1>Steps</h1>
                        <ol>
                            {recipes.steps.map((eachStep) =>
                                <li>{eachStep}</li>
                            )}
                        </ol>
                        
                    </div>
                </Popup>
                )}
                <h2>Disliked</h2>
                {this.state.disliked.map((recipes) =>
                    <span>{recipes.name} <br /></span>
                )}
            </div>
        );
    }
}

export default Favorites;