import React, { Component } from 'react';
import { ingredients, foodtypes } from "../../store.js";

// Function to check if ingredient is valid

export const switchNameHandler = (input, foods) => {
    //Ignores case sensitivity
    var textinput = input.toLowerCase();
        console.log(textinput);
        // console.log(ingredient.length);
        var i = 0
    // Compares input to all ingredients, stops once it adds the ingredient to list
    // Also doesn't run if ingredient is already in list
        while(i < ingredients.length && !foods.includes(textinput)) {
            if (textinput === ingredients[i].id) {
                foods.push(textinput);
            }
            i++
        }
    console.log('-------');
    console.log(foods);
}