import React, { Component } from "react";
import Header from "./Components/Layouts/Header";
import Footer from "./Components/Layouts/Footer";
import Ingredients from "./Components/Ingredients";
import { foodTypes } from "./store.js";
import firebase from './firebase.js';
import Modal from "./Components/Layouts/Modal"

export function testFireBaseIngredients() {
    let testIng = [
        {
            foodTypes: "beats",
            name: "   fFF/n<script>sdfsdf",
            id: "bdf sdf dsf"
        },
        {
            id: "bdf sdf dsf"
        },
        {
            name: "dsfsdf sdfew",
            id: "bdf sdf dsf"
        }
    ];
    var rVar = true
    var userData = {
        testIngredients: testIng
    };
    var updates = {};
    updates['/testing/'] = userData;
    firebase.database().ref().update(updates);
    var ref = firebase.database().ref('/testing/testIngredients');
    ref.once("value")
        .then((snapshot) => {
            if (snapshot.val().length !== testIng.length) {
                rVar = false
            }
            for (var i = 0; i < testIng.length; i++) {
                if (snapshot.val()[i].length !== testIng[i].length) {
                    rVar = false
                }
                for (var j = 0; j < testIng[i].length; j++) {
                    if (snapshot.val()[i][j] !== testIng[i][j]) {
                        rVar = false
                    }
                }
            }

        });
    firebase.database().ref('/testing/').set({
        testIngredients: null
    })
    return rVar
}

export function testFireBaseRecipes(recipes) {
    if (recipes != null && recipes != undefined) {
        return true
    } else {
        return false
    }
}

export function testFireBaseLogIn(user) {
    if (user != null && user != undefined) {
        return true
    } else {
        return false
    }
}

//var testing = (function () { return { getMatchingRecipes: function () { getMatchingRecipes(); } } })

/*export function testFireBaseFridge() {
    // Unit test set up
    let testUserId = "testing"
    let testFridge = ["sdf_DSF324214dsf", "fssd,ert234,12we", "", "   "]
    var rVar = true
    var userData = {
        name: "placeholder",
        fridge: testFridge
    };
    var updates = {};
    updates['/users/' + testUserId] = userData;
    firebase.database().ref().update(updates);
    // End of set up
    // Function to be tested
    var ref = firebase.database().ref("users/" + testUserId + '/fridge');
    ref.once("value")
        .then((snapshot) => {
            // Testing
            if (testFridge.length !== snapshot.val().length) {
                rVar = false
            }
            for (var i = 0; i < testFridge.length; i++) {
                if (testFridge[i] !== snapshot.val()[i]) {
                    rVar = false
                }
            }
            // End of testing
        });
    // Tear down, delete firebase entries
    firebase.database().ref("users/" + testUserId).set({
        name: null,
        fridge: null
    })
    // Return whether test true or false
    return rVar
}*/

export function testMatchingRecipes(foo) {
    /*var testFoods = foo;
    getMatchingRecipes(testFoods)*/
}