import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom';
import Header from "./Components/Layouts/Header";
import ingList from "./Components/Ingredients/enteredIng";
import { switchNameHandler } from "./Components/Ingredients/input";
import Footer from "./Components/Layouts/Footer";
import Recipes from "./Components/Ingredients/Recipes";
import Ingredients from "./Components/Ingredients";
import { ingredients, foodtypes, recipes } from "./store.js";

//Contains list of user ingredients

export default class extends Component {
    // Allows use of functions
        state = {
            ingredients,
            recipes,
            switchNameHandler,
            ingredient: {},
            foods: [],
            showing: false
    };
    // After enter key is pressed puts user input through validation
        pressed = (event) => {
            console.log(event)
      if (event.key == 'Enter') {
          switchNameHandler(document.getElementById('textinput1').value, this.state.foods)
          // Empties input bar, ease of use
          document.getElementById('textinput1').value = ''
          // Updates display
          this.setState(this.state)
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
      if (!this.state.foods.includes(id)) {
          this.setState(prevState => ({
              foods: [...prevState.foods, id]
          }))
      }
      console.log(this.state.foods)
  }

  handleRemoveIngredient = food => {
      // Removes ingredient from list
      this.state.foods.splice(this.state.foods.indexOf(food), 1)
      /*this.setState(prevState => ({
          foods: prevState.foods.splice(prevState.foods.indexOf(food), 1)
      }))*/
      this.setState(this.state)
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
      console.log(this.state.recipes[0].ingredientID)
    return (
        <Fragment>
            <Header />
            <h1>Input Ingredients</h1>
            <input type="text"
                id="textinput1"
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