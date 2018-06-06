import React, { Component } from "react";
import Header from "./Components/Layouts/Header";
import { List } from 'material-ui';
import Footer from "./Components/Layouts/Footer";
import Ingredients from "./Components/Ingredients";
import { foodTypes } from "./store.js";
import firebase from './firebase.js';
import Popup from "reactjs-popup";
import Modal from "./Components/Layouts/Modal";
import { Recipes, getMatchingRecipes } from "./Components/Ingredients/Recipes";
import RecipeDisplay from "./Components/Ingredients/RecipeDisplay";
import { testFireBaseIngredients, testFireBaseRecipes, testFireBaseLogIn, testFireBaseFridge, testMatchingRecipes } from './testUnit';
import './App.css';

export default class extends Component {
    // Allows use of functions
    constructor() {
        super();
        this.state = {
            testFireBaseIngredients, testFireBaseRecipes, testFireBaseLogIn, testFireBaseFridge, testMatchingRecipes,
            getMatchingRecipes,
            ingredients: [], // List of ingredients
            foodTypes, // List of foodTypes
            currentIngredients: [], // List of currently displaying ingredients
            selectedFoodTypes: foodTypes, // List of currently displaying foodTypes
            //ingredient: {}, 
            foods: [], // Ingredients user wishes to use    
            showingRecipes: false, // Showing the recipes
            authState: false,
            userId: "",
            displayedRecipes: []
        };
    }

    componentDidUpdate = (prevProps, prevState) => {
        // If user selected ingredients change, don't display recipes
        if (prevState.foods != this.state.foods) {
            this.setState((prevState) => {
                return {
                    showingRecipes: false,
                    displayedRecipes: []
                }
            })
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
            return { foods: prevState.foods }
        })
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

    handleShowingRecipes = () => {
        //while (hold.length === 0) { }
        // If user wants to display recipes
        this.setState((prevState) => {
            return {
                // Set showing to true
                showingRecipes: !prevState.showingRecipes,
                // Call function that gets recipes
                displayedRecipes: getMatchingRecipes(prevState.foods, [], prevState.userId, this.handleUpdateRecipes)
            }
        })
    }

    handleUpdateRecipes = (newRecipes) => {
        this.setState((prevState) => {
            return { displayedRecipes: newRecipes }
        })
    }

    //Links recipe details placeholder
    handleLinkingRecipes = (recipeName) => {
        //firebase.database.ref('recipes').
        this.state.recipes.map((recipe) => {
            if (recipeName === recipe.name) {
                window.open(recipe.link)
            }
        })
        /*
        firebase.database().ref('/recipes/').once('value').then((snapshot) => {
            for (var i = 0; i < snapshot.val().length; i++) {
                if (snapshot.val()[i].name === recipeName) {

                }
            }
        })*/
    }

    handleSavingRecipes = (recipeName) => {
        if (recipeName) {
            var data = firebase.database().ref('/users/' + this.state.userId + '/liked');
            data.on('value', (snapshot) => {
                if (snapshot.val()) {
                    if (snapshot.val().includes(recipeName)) {
                        console.log("Already Liked")
                    } else {
                        var updates = {};
                        var newData = snapshot.val();
                        newData.push(recipeName)
                        updates['/users/' + this.state.userId + '/liked'] = newData;
                        firebase.database().ref().update(updates);
                    }
                } else {
                    var updates = {};
                    updates['/users/' + this.state.userId + '/liked'] = [recipeName];
                    firebase.database().ref().update(updates);
                }
            })
        }
    }

    handleRemovingRecipes = (recipeName) => {
        console.log(document.getElementById("ingredientsDisplayed"))
        if (recipeName) {
            var data = firebase.database().ref('/users/' + this.state.userId + '/disliked');
                data.on('value', (snapshot) => {
                if (snapshot.val()) {
                    if (snapshot.val().includes(recipeName)) {
                        console.log("Already Disliked")
                    } else {
                        var updates = {};
                        var newData = snapshot.val();
                        newData.push(recipeName)
                        updates['/users/' + this.state.userId + '/disliked'] = newData;
                        firebase.database().ref().update(updates);
                    }
                } else {
                    var updates = {};
                    updates['/users/' + this.state.userId + '/disliked'] = [recipeName];
                    firebase.database().ref().update(updates);
                }
            })
        }
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
        //holdData.fridge = this.state.foods;
        // Creates userDB and fills it with placehpolder information.
        if (this.state.foods.length > 0) {
            var updates = {};
            updates['/users/' + this.state.userId + '/fridge'] = this.state.foods;
            return firebase.database().ref().update(updates);
        }
    }

    // -------------- USER AUTH ---------------- \\
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
                fridge: [],
                favRecipes: [],
                disliked: []
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
        // Loads user fridge if there is a user signed in
        if (this.state.uid != "") {
            console.log("gang")
            var ref = firebase.database().ref("users/" + this.state.userId + '/fridge');
            ref.on("value", (snapshot) => {
                if (snapshot.val()) {
                    this.setState((prevState) => {
                        return { foods: snapshot.val() }
                    })
                }
                });
        }
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
        // Gets recipes and ingredients from the data base
        firebase.database().ref('ingredients').once('value').then((snapshot) => {
            this.setState({
                ingredients: snapshot.val(),
                currentIngredients: snapshot.val()
            })
        })
        
        /*------------UNIT TESTING------------\\
        console.log(testMatchingRecipes(this.state.foods));
        console.log(testFireBaseFridge());
        console.log(testFireBaseIngredients());

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
        return (/*
            <div>
            <div className="demo-big-content">
                <Layout>
                    <Header className="headerColor" title={<Link style={{ textDecoration: 'none', color: 'white' }}
                        to="/">SikBao</Link>} scroll>
                        <Navigation>
                            <Link to="/Favorites">Favorites</Link>
                            <Link to="/Profile">Profile</Link>
                            <Link to="/Settings">Settings</Link>
                        </Navigation>
                    </Header>
                    <Drawer title={<Link style={{ textDecoration: 'none', color: 'black' }}
                        to="/">SikBao</Link>}>
                        <Navigation>
                            <Link to="/Favorites">Favorites</Link>
                            <Link to="/Profile">Profile</Link>
                            <Link to="/Settings">Settings</Link>
                        </Navigation>
                    </Drawer>
                    </Layout>
                    </div>*/
            <div>
                <Header />
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
                {// Button for showing recipes
                }
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
                {this.state.showingRecipes
                    ?
                    this.state.displayedRecipes !== null
                        ?
                        <RecipeDisplay
                            displayedRecipes={this.state.displayedRecipes}
                            foods={this.state.foods}
                            saveClick={this.handleSavingRecipes}
                            removeClick={this.handleRemovingRecipes}
                            ingredientsOwned={this.handleIngredientsOwned}
                        //linkRecipes={this.handleLinkingRecipes}
                        />
                        :null
                        :
                        <button
                            id="btnShowRecipes"
                            className="btn btn-secondary"
                            onClick={this.handleShowingRecipes}
                        > Display Recipes
                        </button>
                    // Else don't
                    
                }
                <p id="demo"></p>
            </div>
               // </div>
        )
    }
}
