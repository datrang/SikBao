import React, { Component } from 'react';

// Function to check if ingredient is valid

export const switchNameHandler = (input, foods) => {

    //Ignores case sensitivity
    var textinput = input.toLowerCase();
        console.log(textinput);
        // console.log(ingredient.length);
    //Checks to see if food is valid
        if (!foods.includes(textinput)) {
            if ((textinput === "rice") || (textinput === "banana") || (textinput === "chicken") || (textinput === "garlic")
                || (textinput === "pasta") || (textinput === "bread") || (textinput === "bacon") || (textinput === "eggs")
                || (textinput === "beans") || (textinput === "cheese") || (textinput === "broccoli") || (textinput === "pork")
                || (textinput === "steak")) {
                //If valid it pushes to ingredient list
                foods.push(textinput);
            }
        }
        console.log('-------');
        console.log(foods);
    }