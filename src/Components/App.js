import React, { Component, Fragment } from "react";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import Ingredients from "./Ingredients";
import { ingredients, foodtypes } from "../store.js";

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
