import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
        foods: [], // Ingredients user wishes to use
        currentFood: ""
    };
}

  onInputChange = e => {
    this.setState({currentFood: e.target.value});
  }
  onClick = () =>{
    let foodCopy = this.state.foods.slide();
    foodCopy.push(this.state.currentFood);

    this.setState({foods: foodCopy, currentFood:""});
  }


  render() {
  let bulletedFood = this.state.foods.map((e,i) =>{
  return (
  <li key = {i}>{e}</li>
  );
  });
  return(
  <div>
  <input placeholder = "Enter food" value= {this.state.currentFood}
    onChange={this.onInputChange}/>
    <button onClick ={this.onClick}>Add!</button>
    <br />
    {this.state.todos.length === 0 ? "No food" : <ul>{bulletedFood}</ul>}
    </div>
  );
};
};  
