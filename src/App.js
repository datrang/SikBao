import React, { Component, Fragment } from "react";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Recipes from "./Components/Ingredients/Recipes";
import Ingredients from "./Components/Ingredients";
import { ingredients, foodtypes, recipes } from "./store.js";
import firebase from './firebase.js';
import Popup from "reactjs-popup";
import Modal from"./Components/Layouts/Modal"
import './modals.css';


export default class extends Component {
    // Allows use of functions
    constructor() {
        super();
            this.state = {
                ingredients, // List of ingredients
                foodtypes, // List of foodtypes
                recipes, // List of recipes
                currentIngredients: ingredients, // List of currently displaying ingredients
                selectedFoodTypes: foodtypes, // List of currently displaying foodtypes
                //ingredient: {}, 
                foods: [], // Ingredients user wishes to use
                showingRecipes: false, // Showing the recipes
                authState: false
        };
    }

    // After enter key is pressed puts user input through validation
    pressed = (event) => {
        if (event.key === 'Enter') {
            // Checks user input after enter is pressed
            ingredients.map((ing) => 
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
        return Object.entries(
        this.state.currentIngredients.reduce((currentIngredients, ingredient) => {
            const { foodtypes } = ingredient;
            // Sees if the ingredient already has a food type
            currentIngredients[foodtypes] = currentIngredients[foodtypes]
            // If so adds it to the list of ingredients inside the foodtype
                ? [...currentIngredients[foodtypes], ingredient]
                : [ingredient];
            return currentIngredients;
        }, {})
        );
    }

    handleIngredientSelected = id => {
        // If ingredient isn't already in list add it

        !this.state.foods.includes(id)
            ?
                this.setState((prevState) => {
                    return { foods: [...prevState.foods, id] }
                })
            : null
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
                    ingredients.map((ing) =>
                        // Check all ingredients
                        ing.id.includes(document.getElementById('userInput1').value)
                            ?
                                // If ingredient includes user input add to ingredients to be displayed
                                hold.push(ing)
                            :
                                // Else do nothing
                                null
                    )
                    // Update displayed ingredients
                    return { currentIngredients: hold }
                })
            :
                // If empty display all ingredients
                this.setState((prevState) => {
                    return { currentIngredients: ingredients }
                })
    }

    // Links recipe details placeholder
    handleLinkingRecipes = (recipeName) => {
        recipes.map((recipe) => {
            if (recipeName === recipe.name) {
                window.open(recipe.link)
            }
        })
    }

    // Hides food types
    handleHideFoodTypes = (foodType) => {
        this.state.selectedFoodTypes.includes(foodType)
            ? // Makes sure foodtype is in foodtypes before removing
                this.setState((prevState) => {
                    // Removes the food type from array of foodtypes to display
                    prevState.selectedFoodTypes.splice(prevState.selectedFoodTypes.indexOf(foodType), 1)
                        return { selectedFoodTypes: prevState.selectedFoodTypes }
                })
            : null //Else do nothing
    }

    //Shows food types
    handleDisplayFoodTypes = (foodType) => {
        this.state.selectedFoodTypes.includes(foodType)
            ? null // If foodtype is already displaying do nothing
            : // Else add it to list of foodtypes to display
                this.setState((prevState) => {
                    return { selectedFoodTypes: [...prevState.selectedFoodTypes, foodType]}
                })
    }

    handleSavingIngredients = (e) => {
        e.preventDefault();
        // saves user ingredients to their fridge
        const itemsRef = firebase.database().ref('userIngredients');
        const item = {
            ingredients: this.state.foods
        }
        // Currently adds new fridge
        // Should replace
        itemsRef.push(item);
    }

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
        promise.catch(e => console.log(e.message));
    }

    handleLogOut = (e) => {
        // Calls fire function to sign out
        firebase.auth().signOut()
        console.log(firebase.auth().currentUser)
    }

    componentDidMount = () => {
        // Incase firebase takes longer than the render
        firebase.auth().onAuthStateChanged((user) => {
            this.setState(this.state)
            console.log("okok")
        })
    }

    render() {
        const ingredients = this.getIngredientsByFoodtypes();
        //console.log(firebase.auth().currentUser)
        return (
            <div>
                <Header />
                <input
                    type="text"
                    id="textInput1"
                    onKeyPress={this.pressed} />
                {firebase.auth().currentUser
                    ?
                    // Log out button
                    <button
                        id="btnLogOut"
                        className="btn btn-secondary"
                        onClick={this.handleLogOut}
                    > Log Out
                    </button>
                        
                    :
                    // Popup container for login
                    <Modal
                        logIn={this.handleLogIn}
                        signUp={this.handleSignUp}
                    />
                }
                <input type="checkbox" />
                <button
                    name="showRecipes"
                    onClick={this.handleShowRecipes}
                >
                    Search for Recipes
                </button>
                <button
                    name="saveIngredients"
                    onClick={this.handleSavingIngredients}
                >
                    Save ingredients!
                    </button>
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
                <Footer foodtypes={foodtypes} />
                {this.state.showing
                    ?
                    <Recipes
                        foods={this.state.foods}
                        recipes={this.state.recipes}
                        linkRecipes={this.handleLinkingRecipes}
                    />
                    : null
                }
                <p id="demo"></p>
            </div>
        )
    }
}
