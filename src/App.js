import React, { Component, Fragment } from "react";
import Header from "./components/Layouts/Header";
import Footer from "./components/Layouts/Footer";
import Ingredients from "./components/Ingredients";
import { ingredients, foodtypes } from "./store.js";
    var i;
var j;
var ingredient = [];
var food = [];
export default class extends Component {
  state = {
    ingredients
  };


  switchnamehandler(){

    var textinput = document.getElementById('textinput1').value;
    var textinput1 = document.getElementById('textinput2').value;
    var textinput2 = document.getElementById('textinput3').value;
    var textinput3 = document.getElementById('textinput4').value;
    var textinput4 = document.getElementById('textinput5').value;
    ingredient.push(textinput);
    ingredient.push(textinput1);
    ingredient.push(textinput2);
    ingredient.push(textinput3);
    ingredient.push(textinput4);
    console.log(ingredient);
    // console.log(ingredient.length);
    
    var j = (ingredient.length);
 
      if((textinput === "rice")|| (textinput === "banana") || (textinput === "chicken") || (textinput === "garlic")
        || (textinput === "pasta") || (textinput === "bread") || (textinput === "bacon")|| (textinput === "eggs")
        ||  (textinput === "beans") || (textinput === "cheese") || (textinput === "broccoli") || (textinput === "pork")
        || (textinput === "steak")){

        food.push(textinput);

      }
        if((textinput1 === "rice")|| (textinput1 === "banana") || (textinput1 === "chicken") || (textinput1 === "garlic")
        || (textinput1 === "pasta") || (textinput1 === "bread") || (textinput1 === "bacon")|| (textinput1 === "eggs")
        ||  (textinput1 === "beans") || (textinput1 === "cheese") || (textinput1 === "broccoli") || (textinput1 === "pork")
        || (textinput1 === "steak")){

        food.push(textinput1);

      }
        if((textinput2 === "rice")|| (textinput2 === "banana") || (textinput2 === "chicken") || (textinput2 === "garlic")
        || (textinput2 === "pasta") || (textinput2 === "bread") || (textinput2 === "bacon")|| (textinput2 === "eggs")
        ||  (textinput2 === "beans") || (textinput2 === "cheese") || (textinput2 === "broccoli") || (textinput2 === "pork")
        || (textinput2 === "steak")){

        food.push(textinput2);

      }
            if((textinput3 === "rice")|| (textinput3 === "banana") || (textinput3 === "chicken") || (textinput3 === "garlic")
        || (textinput3 === "pasta") || (textinput3 === "bread") || (textinput3 === "bacon")|| (textinput3 === "eggs")
        ||  (textinput3 === "beans") || (textinput3 === "cheese") || (textinput3 === "broccoli") || (textinput3 === "pork")
        || (textinput3 === "steak")){

        food.push(textinput3);

      }
            if((textinput4 === "rice")|| (textinput4 === "banana") || (textinput4 === "chicken") || (textinput4 === "garlic")
        || (textinput4 === "pasta") || (textinput4 === "bread") || (textinput4 === "bacon")|| (textinput4 === "eggs")
        ||  (textinput4 === "beans") || (textinput4 === "cheese") || (textinput4 === "broccoli") || (textinput4 === "pork")
        || (textinput4 === "steak")){

        food.push(textinput4);

      }
          
  console.log('-------');
  console.log(food);
}
myFunction(){
  var str = "https://www.recipetineats.com/oven-baked-chicken-and-rice/";
    var str1 = "e/";
  var result = str.link("https://www.recipetineats.com/oven-baked-chicken-and-rice/");
    var result1 = str1.link("https://www.recipetineats.com/oven-baked-chicken-and-rice/");
  console.log(food);
  console.log(food.length);
  for(i=0; i<food.length; i++){
    if((food[i] === "rice") || (food[i] === "chicken")|| (food[i]==="garlic")) {
      document.getElementById("demo").innerHTML=result;
    }

    } 
       if ((food[0]==="steak")|| (food[0]==="rice")){
       document.getElementById("demo").innerHTML=result1;
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
  }

  render() {
    const ingredients = this.getIngredientsbyFoodtypes()

    return (
      <Fragment>
        <Header />

        <ingredients ingredients={ingredients} />

        <Footer foodtypes={foodtypes} />
                <h1> INPUT INGREDIENTS</h1> 
        <input type="text" id="textinput1" />
        <input type="text" id="textinput2" />
        <input type="text" id="textinput3" />
        <input type="text" id="textinput4" />
        <input type="text" id="textinput5" />
        <button onClick = {this.switchnamehandler}>input</button>
        <button onClick = {this.myFunction}>checkinputarray</button>
        <p id="demo"></p>
      </Fragment>
    )
  }
}
