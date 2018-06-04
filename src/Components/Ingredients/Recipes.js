import React, { Fragment } from 'react';
import { List } from 'material-ui';
import { ListItem, ListItemText } from 'material-ui/List';
import Popup from 'reactjs-popup';
import firebase from '../../firebase.js';
import Ingredients from "../../Components/Ingredients";
// Displays recipes based on ingredients selected

export const Recipes = ( foods, displayedRecipes, linkRecipes ) => (
    <div>
        {console.log(displayedRecipes)}
        <List component="ul">
            {displayedRecipes.map((recipes) =>
                // If it is print that recipe
                console.log("sdf")
            )}
        </List>
    </div>
    
);

    /*
    handleShowRecipes = () => {
        // Hides and displays the recipes
        firebase.database().ref('/recipes/').once('value').then((snapshot) => {
            this.setState((prevState) => {
                return {
                    showing: !prevState.showing,
                    displayedRecipes: getMatchingRecipes(snapshot.val(), prevState.foods)
                }
            })
        })
        //console.log(this.state.showing)
    }
    */
export const getMatchingRecipes = (foods, displayedRecipes, handleUpdateRecipes) => {
    // all recipes will hold a 2D array
    // containing the recipe name and number of matches
    var allRecipes = [];
    displayedRecipes = [];
    var mostMatches;
    var mostMatchedIndex;
    if (foods.length > 0) {
        // Rudimentary sorted search
        // Searchs by number of matches
        firebase.database().ref('/recipes/').once('value').then((snapshot) => {
            console.log("ok")
            // i goes through each recipe
            for (var i = 0; i < snapshot.val().length; i++) {
                // j goes through each ingredient in the recipe
                for (var j = 0; j < snapshot.val()[i].ingredients.length; j++) {
                    // k goes through each ingredient the user has selected
                    for (var k = 0; k < foods.length; k++) {
                        // checks each recipe ingredient to the users inputted ingredients
                        if (snapshot.val()[i].ingredients[j].name.toLowerCase().indexOf(foods[k]) != -1) {
                            // if there is no other recipe auto add it
                            if (allRecipes.length != 0) {
                                // if there is a recipe already added check incase of dupe
                                for (var l = 0; l < allRecipes.length; l++) {
                                    if (allRecipes[l][0].name === snapshot.val()[i].name) {
                                        // if there is a dupe add 1 to its number of matches
                                        allRecipes[l][1]++;
                                        l = allRecipes.length;
                                    } else if (l === allRecipes.length - 1) {
                                        // if this recipe isn't a dupe add it to list of recipes to display
                                        allRecipes.push([snapshot.val()[i], 1])
                                    }
                                }
                            } else {
                                allRecipes.push([snapshot.val()[i], 1])
                            }
                        }
                    }
                }
            }
            // saves length since elements will be deleted
            var leng = allRecipes.length
            for (var i = 0; i < leng; i++) {
                // default sets most number of matches to first element
                mostMatches = allRecipes[0][1];
                mostMatchedIndex = 0;
                // goes through each recipe in the list
                for (var j = 1; j < allRecipes.length; j++) {
                    // checks to see if recipe has more matches
                    if (mostMatches < allRecipes[j][1]) {
                        // if so remember it
                        mostMatches = allRecipes[j][1];
                        mostMatchedIndex = j;
                    }
                }
                // adds recipe in order of most matches
                displayedRecipes.push(allRecipes[mostMatchedIndex][0]);
                // then removes the element so it won't be included in search again
                allRecipes.splice(mostMatchedIndex, 1);
            }
            console.log(displayedRecipes)
            //return displayedRecipes
            handleUpdateRecipes(displayedRecipes)
        })
    }
    // returns a empty array if no foods selected
    return null
}

