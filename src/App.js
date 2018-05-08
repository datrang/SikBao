import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Header from "./Components/Layouts/Header";
import ingList from "./Components/Ingredients/enteredIng";
import Footer from "./Components/Layouts/Footer";
import Recipes from "./Components/Ingredients/Recipes";
import Ingredients from "./Components/Ingredients";
import { ingredients, foodtypes, recipes } from "./store.js";

//Contains list of user ingredients

export default class extends Component {
    // Allows use of functions
    constructor() {
        super();
        this.state = {
            ingredients,
            recipes,
            ingredient: {},
            foods: [],
            showing: false
        };
    }
    // After enter key is pressed puts user input through validation
        pressed = (event) => {
            if (event.key == 'Enter') {
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
          this.state.ingredients.reduce((ingredients, ingredient) => {
              const { foodtypes } = ingredient;
              // Sees if the ingredient already has a food type
              ingredients[foodtypes] = ingredients[foodtypes]
                 // If so adds it to the list of ingredients inside the foodtype
             ? [...ingredients[foodtypes], ingredient]
             : [ingredient];
        return ingredients;
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
          return { foods: prevState.foods.splice(prevState.foods.indexOf(food), 1) }
      })
  }

  handleShowRecipes = () => {
      // Hides and displays the recipes
      this.setState(prevState => ({
          showing: !prevState.showing
      }))
      console.log(this.state.showing)
  }

  render() {
      const ingredients = this.getIngredientsByFoodtypes();
    return (
        <Fragment>
            <Header />
            <h1>Input Ingredients</h1>
            <input type="text"
                id="textInput1"
                onKeyPress={this.pressed} />
            <input type="checkbox" />
            <button
                type="button"
                name="showRecipes"
                onClick={this.handleShowRecipes}
                >
                Search for Recipes
                </button>
            <Ingredients
                ingredients={ingredients}
                foods={this.state.foods}
                onSelect={this.handleIngredientSelected}
                onRemoval={this.handleRemoveIngredient}
                keyPress={this.pressed}
                    />
            <Footer foodtypes={foodtypes} /> 
             {this.state.showing
                    ? <Recipes
                        foods={this.state.foods}
                        recipes={this.state.recipes}
                    />
                    : null
                }
            <p id="demo"></p>
        </Fragment>
    )
  }
}