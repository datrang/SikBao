import React, { Component } from 'react';

// components

export const switchNameHandler = (input, foods) => {
    var textinput = input.toLowerCase();
        console.log(textinput);
        // console.log(ingredient.length);
        if (!foods.includes(textinput)) {
            if ((textinput === "rice") || (textinput === "banana") || (textinput === "chicken") || (textinput === "garlic")
                || (textinput === "pasta") || (textinput === "bread") || (textinput === "bacon") || (textinput === "eggs")
                || (textinput === "beans") || (textinput === "cheese") || (textinput === "broccoli") || (textinput === "pork")
                || (textinput === "steak")) {

                foods.push(textinput);
            }
        }
        console.log('-------');
        console.log(foods);
    }