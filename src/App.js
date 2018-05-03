import React, { Component, Fragment } from "react";
import ReactDOM from 'react-dom'
import Header from "./Components/Layouts/Header"
import ingList from "./Components/Ingredients/enteredIng"
import { switchNameHandler } from "./Components/Ingredients/input";
import Footer from "./Components/Layouts/Footer";
import Ingredients from "./Components/Ingredients";
import LeftPane from "./Components/Ingredients";
import RightPane from "./Components/Ingredients";
import { ingredients, foodtypes } from "./store.js";

//Contains list of user ingredients
var foods = [];
var element1;
var element2;

export default class extends Component {
    // Allows use of functions
        state = {
            ingredients,
            switchNameHandler,
            foodtypes
    };
    // After enter key is pressed puts user input through validation
  pressed = (event) => {
      if (event.key == 'Enter') {
          switchNameHandler(document.getElementById('textinput1').value, foods)
          // Empties input bar, ease of use
          document.getElementById('textinput1').value = ''
          console.log(ingredients[0].id)
          this.element1 = <h2>popcorn</h2>
          this.element2 = <button onClick=""> X</button>
          //ReactDOM.hydrate(this.element1, document.getElementById('root'));
          //ReactDOM.render(this.element2, document.getElementById('root'));
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
            <Ingredients ingredients={ingredients} />
            <Footer foodtypes={foodtypes} /> 
            <h1>Input Ingredients</h1>
            <input type="text" id="textinput1" onKeyPress={this.pressed} />
            <input type="checkbox" />
            <p id="demo"></p>
      </Fragment>
    )
  }
}