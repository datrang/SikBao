import React, { Component, Fragment } from "react";
import Header from "./Components/Layouts/Header"
import ingList from "./Components/Ingredients/enteredIng"
import { switchNameHandler } from "./Components/Ingredients/input";
import Footer from "./Components/Layouts/Footer";
import Ingredients from "./Components/Ingredients";
import { ingredients, foodtypes } from "./store.js";

var foods = [];

export default class extends Component {
        state = {
            ingredients,
            switchNameHandler
        };
  pressed = (event) => {
      if (event.key == 'Enter') {
          switchNameHandler(document.getElementById('textinput1').value, foods)
          document.getElementById('textinput1').value = ''
      }
  }
  getIngredientsbyFoodtypes() {
    return Object.entries(
      this.state.ingredients.reduce((ingredients, ingredient) => {
        const { foodtypes } = ingredient;

        ingredients[foodtypes] = ingredient[foodtypes]
          ? [...ingredients[foodtypes], ingredient]
          : [ingredient];

        return ingredients;
      }, {})
    );
  }z

  render() {
      const ingredients = this.getIngredientsbyFoodtypes()

    return (
        <Fragment>
            <Header />
            
            <ingredients ingredients={ingredients} />

            <Footer foodtypes={foodtypes} />
            <h1>Input Ingredients</h1>
            <input type="text" id="textinput1" onKeyPress={this.pressed} />
            <p id="demo"></p>
      </Fragment>
    )
  }
}