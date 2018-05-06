import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom'
import Header from "./Components/Layouts/Header"
import ingList from "./Components/Ingredients/enteredIng"
import { switchNameHandler } from "./Components/Ingredients/input";
import Footer from "./Components/Layouts/Footer";
import Ingredients from "./Components/Ingredients";
import { ingredients, foodtypes } from "./store.js";

//Contains list of user ingredients

export default class extends Component {
    // Allows use of functions
        state = {
            ingredients,
            switchNameHandler,
            ingredient: {},
            foods: []
    };
    // After enter key is pressed puts user input through validation
  pressed = (event) => {
      if (event.key == 'Enter') {
          switchNameHandler(document.getElementById('textinput1').value, this.state.foods)
          // Empties input bar, ease of use
          document.getElementById('textinput1').value = ''
          // Updates display
          this.setState(this.state)
      }
  }
  getIngredientsByFoodtypes() {
      return Object.entries(
          this.state.ingredients.reduce((ingredients, ingredient) => {
            const { foodtypes } = ingredient;
             ingredients[foodtypes] = ingredients[foodtypes]
             ? [...ingredients[foodtypes], ingredient]
             : [ingredient];
        return ingredients;
      }, {})
    );
  }

  handleIngredientSelected = id => {
      // If ingredient isn't already in list add it
      this.setState(prevState => ({
        foods: [...prevState.foods, id]
      }))
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
  render() {
      const ingredients = this.getIngredientsByFoodtypes();
     // console.log(ingredients)  
      //console.log(foods);
    return (
        <Fragment>
            <Header />
            <h1>Input Ingredients</h1>
            <input type="text"
                id="textinput1"
                onKeyPress={this.pressed} />
            <input type="checkbox" />
            <Ingredients
                ingredients={ingredients}
                foods={this.state.foods}
                onSelect={this.handleIngredientSelected}
                onRemoval={this.handleRemoveIngredient}
                    />
            <Footer foodtypes = {foodtypes} /> 
            <p id="demo"></p>
      </Fragment>
    )
  }
}