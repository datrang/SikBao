import React, { Component } from "react";
// import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Recipes from "./Components/Ingredients/Recipes";
import Ingredients from "./Components/Ingredients";
import { foodTypes, testerer } from "./store.js";
import firebase from './firebase.js';
import Modal from"./Components/Layouts/Modal"
import './App.css';
import { Layout, Header, Navigation, Drawer, Content } from 'react-mdl';
import Main from './Components/Layouts/Main';
import {Link} from 'react-router-dom';

export default class extends Component {
    // Allows use of functions
    constructor() {
        super();
        this.state = {
            testerer,
            temp: "",
            ingredients: [], // List of ingredients
                foodTypes, // List of foodTypes
                recipes: [], // List of recipes
                currentIngredients: [], // List of currently displaying ingredients
                selectedFoodTypes: foodTypes, // List of currently displaying foodTypes
                //ingredient: {},
                foods: [], // Ingredients user wishes to use
                showingRecipes: false, // Showing the recipes
                authState: false,
                userId: ""
        };
    }


    // After enter key is pressed puts user input through validation
    pressed = (event) => {
        if (event.key === 'Enter') {
            // Checks user input after enter is pressed
            this.state.ingredients.map((ing) =>
                // Compares each ingredient to the user input checking for match
                ing.id === document.getElementById('textInput1').value.toLowerCase()
                    ?
                // If match, update list of ingredients
                this.setState((prevState) => {
                    return { foods: [...prevState.foods, ing.name]}
                })
                // Else do nothing
                    : null
            )
        }
    }

    getIngredientsByFoodtypes() {
        // Seperates the ingredients based on food types
        if (this.state.currentIngredients === null) {
            return null
        } else {
            return Object.entries(
                this.state.currentIngredients.reduce((currentIngredients, ingredient) => {
                    const { foodTypes } = ingredient;
                    // Sees if the ingredient already has a food type
                    currentIngredients[foodTypes] = currentIngredients[foodTypes]
                        // If so adds it to the list of ingredients inside the foodtype
                        ? [...currentIngredients[foodTypes], ingredient]
                        : [ingredient];
                    return currentIngredients;
                }, {})
            );
        }
    }

    handleIngredientSelected = id => {
        // If ingredient isn't already in list add it
        console.log(id)
        if (!this.state.foods.includes(id)) {
            this.setState((prevState) => {
                return { foods: [...prevState.foods, id] }
            })
        }
    }

    handleRemoveIngredient = food => {
        // Removes ingredient from list
        this.setState((prevState) => {
            prevState.foods.splice(prevState.foods.indexOf(food), 1)
                return {foods: prevState.foods }
        })
    }

    handleShowRecipes = () => {
        // Hides and displays the recipes
        this.setState((prevState) => {
            return { showing: !prevState.showing }
        })
            console.log(this.state.showing)
    }

    handleSearching = () => {
        var hold = []
        // Checks if input is empty
        document.getElementById('userInput1').value
            ?
                // If not empty display ingredients that includes the user input
                this.setState((prevState) => {
                    this.state.ingredients.map((ing) =>
                        // Check all ingredients
                        ing.id.includes(document.getElementById('userInput1').value.toLowerCase())
                            ?
                                // If ingredient includes user input add to ingredients to be displayed
                                hold.push(ing)
                            :
                                // Else do nothing
                                null
                    )
                    // Update displayed ingredients
                    if (hold.length > 0) {
                        return { currentIngredients: hold }
                    } else {
                        return { currentIngredients: null }
                    }
                })
            :
                // If empty display all ingredients
                this.setState((prevState) => {
                    return { currentIngredients: prevState.ingredients }
                })
    }

    //Links recipe details placeholder
    handleLinkingRecipes = (recipeName) => {
        this.state.recipes.map((recipe) => {
            if (recipeName === recipe.name) {
                window.open(recipe.link)
            }
        })
    }

    // Hides food types
    handleHideFoodTypes = (foodType) => {
        if (this.state.selectedFoodTypes.includes(foodType)) {
            // Makes sure foodtype is in foodTypes before removing
            this.setState((prevState) => {
                // Removes the food type from array of foodTypes to display
                prevState.selectedFoodTypes.splice(prevState.selectedFoodTypes.indexOf(foodType), 1)
                return { selectedFoodTypes: prevState.selectedFoodTypes }
            })
        }
    }

    //Shows food types
    handleDisplayFoodTypes = (foodType) => {
        if (!this.state.selectedFoodTypes.includes(foodType)) {
            this.setState((prevState) => {
                return { selectedFoodTypes: [...prevState.selectedFoodTypes, foodType] }
            })
        }
    }

    handleSavingIngredients = (e) => {
        e.preventDefault();
        // saves user ingredients to their fridge
        firebase.database().ref('users/' + this.state.userId).set({
            fridge: this.state.foods
        });
    }

    // -------------- USER AUTH ----------------
    handleLogIn = (e) => {
        // Gets the email and password from user input
        const email = document.getElementById('txtEmail').value;
        const pass = document.getElementById('txtPassword').value;
        // Calls firebases log in function using user email and password
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(email, pass);
        // If error prints to console
        // Better to print to screen
        promise.catch(e => console.log(e.message));
    }

    handleSignUp = (e) => {
        // Gets the email and password from user input
        const email = document.getElementById('txtEmail').value;
        const pass = document.getElementById('txtPassword').value;
        // Calls firebases sign up function using user email and password
        const auth = firebase.auth();
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        // If error prints to console
        // Better to print to screen
        promise
            .then(this.createUserDB(email))
            .catch(e => console.log(e.message));
    }

    createUserDB = (email) => {
        // Firebase lags, so once firebase updates create the user's DB
        firebase.auth().onAuthStateChanged(user => {
            var userData = {
                name: "placeholder",
                fridge: ""
            };
            // Creates userDB and fills it with placehpolder information.
            var updates = {};
            updates['/users/' + user.uid] = userData;
            return firebase.database().ref().update(updates);
        })

    }

    handleLogOut = (e) => {
        // Calls fire function to sign out
        firebase.auth().signOut()
        console.log(firebase.auth().currentUser)
    }

    handleLoadFridge = () => {
        var ref = firebase.database().ref("users/" + this.state.userId);
        ref.once("value")
            .then(function (snapshot) {
                var name = snapshot.child("fridge").val();
                this.setState((prevState) => {
                    return { currentIngredients: this.state.userId }
                })
                console.log(name)
            });
    }

    componentDidMount = () => {
        // Incase firebase takes longer than the render
        firebase.auth().onAuthStateChanged((user) => {
            // Grabs UID of user if there one
            if (user) {
                this.setState((prevState) => {
                    return { userId: user.uid }
                })
            } else {
                this.setState((prevState) => {
                    return { userId: "" }
                })
            }
        })
        firebase.database().ref('ingredients').once('value').then( (snapshot) => {
            this.setState({
                ingredients: snapshot.val(),
                currentIngredients: snapshot.val()
            })
        })
        firebase.database().ref('recipes').once('value').then((snapshot) => {

            this.setState({
                recipes: snapshot.val(),
            })
        })
       /*
        var tester = this.state.testerer

        let i, j, z = 0;
        console.log(tester.length);
        for (i = 0; i < tester.length; i++) {
            console.log(tester[i].ingredients.length);
            for (j = 0; j < tester[i].ingredients.length; j++) {
                var namer = tester[i].ingredients[j].name;
                var typer = tester[i].ingredients[j].type;
                var namer = namer.trim();
                var ider = namer
                for (z = 0; z < namer.length; z++) {
                    if (namer[z] === " ") {
                        namer = namer.slice(0, z+1) + namer.charAt(z+1).toUpperCase() + namer.slice(z+2);
                    }
                }
                namer = namer.charAt(0).toUpperCase() + namer.slice(1);
                tester[i].ingredients[j].name = ider;
                var ing = {
                    name: namer,
                    foodTypes: typer,
                    id: ider
                }
                //this.state.temp.push(ing);
            }
        }

        console.log(tester)

        var rec = JSON.parse((JSON.stringify({ recipes: tester })));
        // Creates userDB and fills it with placehpolder information.
        var updates = {};
        updates['recipes'] = tester;
        firebase.database().ref().update(updates);

  */

    }

    render() {
        const ingredients = this.getIngredientsByFoodtypes();

        //console.log(this.state.recipes)
        return (
            <div>
                <Header />
                <input
                    type="text"
                    id="textInput1"
                    onKeyPress={this.pressed} />
                {firebase.auth().currentUser
                    ?
                    // Loads logout button and load fridge button
                    <div>
                        <button
                            id="btnLogOut"
                            className="btn btn-secondary"
                            onClick={this.handleLogOut}
                        > Log Out
                        </button>
                        <button
                            id="btnLoadFridge"
                            className="btn btn-secondary"
                            onClick={this.handleLoadFridge}
                        > Load fridge
                        </button>
                    </div>
                    :
                    // Popup container for login
                    <Modal
                        logIn={this.handleLogIn}
                        signUp={this.handleSignUp}
                    />
                }
                <input type="checkbox" />
                {// Button for showing recipes
                }
                <button
                    name="showRecipes"
                    onClick={this.handleShowRecipes}
                >
                    Search for Recipes
                </button>
                {// Button for saving ingredients
                }
                <button
                    name="saveIngredients"
                    onClick={this.handleSavingIngredients}
                >
                    Save ingredients!
                </button>
                {// Calls the Ingredients from index.js in components/Layout
                 // And sets the props
                }
                <Ingredients
                    ingredients={ingredients}
                    selectedFoodTypes={this.state.selectedFoodTypes}
                    foods={this.state.foods}
                    onSelect={this.handleIngredientSelected}
                    onRemoval={this.handleRemoveIngredient}
                    onHide={this.handleHideFoodTypes}
                    onDisplay={this.handleDisplayFoodTypes}
                    searching={this.handleSearching}
                />
                {/*
                    <Footer foodTypes={foodTypes} />
                */}
                {this.state.showing
                    // If user wants to display recipes display them
                    ?
                    <Recipes
                        foods={this.state.foods}
                        recipes={this.state.recipes}
                        linkRecipes={this.handleLinkingRecipes}
                    />
                    // Else don't
                    : null
                }
                <p id="demo"></p>
            </div>
        )
    }
}


// render() {
//   return(
//     <div className="demo-big-content">
//         <Layout>
//         // Header for the top left of the page
//             <Header className="headerColor" title={<Link style = {{textDecoration:'none', color: 'white'}}
//             to = "/">SikBao</Link>} scroll>
//                 <Navigation>
//                     <Link to="/profile">Profile</Link>
//                     <Link to="/favorites">Favorites</Link>
//                     <Link to="/settings">Settings</Link>
//                 </Navigation>
//             </Header>
//             // Header for the top left drop out
//             <Drawer title={<Link style = {{textDecoration:'none', color: 'black'}}
//             to = "/">SikBao</Link>}>
//                 <Navigation>
//                     <Link to="/profile">Profile</Link>
//                     <Link to="/favorites">Favorites</Link>
//                     <Link to="/settings">Settings</Link>
//                 </Navigation>
//             </Drawer>
//             <Content>
//                 <div className="page-content" />
//                 <Main/>
//             </Content>
//         </Layout>
//     </div>
//   );
// }
