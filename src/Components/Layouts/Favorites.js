import React, { Component } from 'react'
import firebase from '../../firebase.js';
import { ListItem, ListItemText } from 'material-ui/List';
import Popup from 'reactjs-popup';
import './Layout.css'
import { Grid, Cell } from 'react-mdl';

const styles = {
    remove: {
        background: "red", // Red background 
        border: "#00FF00", // Green border
        color: "white", // White text
        cursor: "pointer" // Pointer/hand icon
    }
}

class Favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            liked: [],
            disliked: [],
            deleting: false
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

    handleRemovingLike = (recipeName) => {
        var newLiked = this.state.liked;
        newLiked.splice(recipeName, 1);
        var newLikedDB = [];
        for (var i = 0; i < newLiked.length; i++) {
            newLikedDB.push(newLiked[i].name);
        }
        var updates = {};
        updates['/users/' + this.state.userId + '/liked'] = newLikedDB;
        firebase.database().ref().update(updates);
        this.setState((prevState) => {
            return { liked: newLiked }
        })
    }

    handleRemovingDislike = (recipeName) => {
        var newDisliked = this.state.disliked;
        newDisliked.splice(recipeName, 1);
        var newDislikedDB = [];
        for (var i = 0; i < newDisliked.length; i++) {
            newDislikedDB.push(newDisliked[i].name);
        }
        var updates = {};
        updates['/users/' + this.state.userId + '/disliked'] = newDislikedDB;
        firebase.database().ref().update(updates);
        this.setState((prevState) => {
            return { disliked: newDisliked }
        })
    }

    handleDeletingChange = () => {
        this.setState((prevState) => {
            return { deleting: !prevState.deleting }
        })
    }

    render() {
        console.log(this.state.liked)
        return (
            this.state.deleting
                ?
                <div>
                    <button
                        id="deletingButton"
                        onClick={this.handleDeletingChange}
                    >Checkmark Icon</button>
                    <h1>Liked</h1>
                    {this.state.liked.map((recipes) =>
                        <button
                            style={styles.remove}
                            id={recipes.name}
                            onClick={() => this.handleRemovingLike(recipes.name)}
                        > {recipes.name}
                        </button>
                    )}
                    <h2>Disliked</h2>
                    {this.state.disliked.map((recipes) =>
                        <button
                            style={styles.remove}
                            id={recipes.name}
                            onClick={() => this.handleRemovingDislike(recipes.name)}
                        > {recipes.name}
                        </button>
                    )}
                </div>
                :
                <div>
                    <button
                        id="deletingButton"
                        onClick={this.handleDeletingChange}
                    >Trashcan Icon</button>
                    <h1>Liked</h1>
                    {this.state.liked.map((recipes) =>
                        <Popup
                            trigger={<button className="button">{recipes.name}</button>}
                            modal
                        >
                            <div className="modal">
                                <h1>Steps</h1>
                                <ol>
                                    {recipes.steps.map((eachStep) =>
                                        <li>{eachStep}</li>
                                    )}
                                </ol>
                                <ul>
                                    <Grid className="demo-grid-1">
                                        {recipes.ingredients.map((ingredients) =>
                                            <Cell col={4}> <li>{ingredients.name}
                                                <br />
                                                Quantity:{ingredients.quantity}</li></Cell>
                                        )}
                                    </Grid>
                                </ul>
                            </div>
                        </Popup>
                    )}
                    <h2>Disliked</h2>
                    {this.state.disliked.map((recipes) =>
                        <Popup
                            trigger={<button className="button">{recipes.name}</button>}
                            modal
                        >
                            <div className="modal">
                                <h1>Steps</h1>
                                <ol>
                                    {recipes.steps.map((eachStep) =>
                                        <li>{eachStep}</li>
                                    )}
                                </ol>
                                <ul>
                                    <Grid className="demo-grid-1">
                                        {recipes.ingredients.map((ingredients) =>
                                            <Cell col={4}> <li>{ingredients.name}
                                                <br />
                                                Quantity:{ingredients.quantity}</li></Cell>
                                        )}
                                    </Grid>
                                </ul>
                            </div>
                        </Popup>
                    )}
                </div>
        );
    }
}

export default Favorites;