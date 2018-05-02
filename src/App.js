import React, { Component, Fragment } from "react";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Ingredients from "./components/Ingredients";
import { ingredients, foodtypes } from "./store.js";

export default class extends Component {
  state = {
    ingredients,
    ingredient:{}
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

  handleCategorySelected = category => {
    this.setState({
      category
    })
  }

  handleIngredientSelected = id => {
    this.setState(({ ingredients }) => ({
      ingredient: ingredients.find(ex => ex.id === id)
    }))
  }

  render() {
    const ingredients = this.getIngredientsbyFoodtypes(),
    {category, ingredient} = this.state

    return (
      <Fragment>
        <Header />

        <ingredients
          ingredient = {ingredient}
          category={category}
          ingredients={ingredients}
          onSelect = {this.handleIngredientSelected}
        />

        <Footer
          category = {category}
          foodtypes={foodtypes}
        onSelect ={this.handleCategorySelected}
        />
      </Fragment>
    )
  }
}
