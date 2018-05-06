import React, { Component } from 'react';
import { ingredients, foodtypes } from "../../store.js";

// Function to check if ingredient is valid

export const switchNameHandler = (input, foods) => {

    //Ignores case sensitivity
    var textinput = input.toLowerCase();
        console.log(textinput);
        // console.log(ingredient.length);
    //Checks to see if food is valid
        var i = 0
        while(i < ingredients.length && !foods.includes(textinput)) {
            if (textinput === ingredients[i].id) {
                foods.push(textinput);
                break;
            }
            i++
        }
        console.log('-------');
        console.log(foods);
    }