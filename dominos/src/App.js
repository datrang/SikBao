import React, { Component, Fragment } from "react";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Ingredients from "./components/Ingredients";
import { ingredients, foodtypes } from "./store.js";

export default class extends Component {
  state = {
    ingredients
  };

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
  }

  render() {
    const ingredients = this.getIngredientsbyFoodtypes()

    return (
      <Fragment>
        <Header />

        <ingredients ingredients={ingredients} />

        <Footer foodtypes={foodtypes} />
      </Fragment>
    )
  }
}
