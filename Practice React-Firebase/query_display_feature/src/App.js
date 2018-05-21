import React, { Component } from 'react';
import './App.css';
import firebase from './firebase.js';

class App extends Component {
  constructor(){
    super();
    this.state = {
      dishName: '',
      ingredients: '',
      items: []
    }
    this.handleChange = this.handleChange.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref('recipe');
    const item = {
      name: this.state.dishName,
      ingredient: this.state.ingredients
    }
    itemsRef.push(item);
    this.setState({
      dishName: '',
      ingredients: ''
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/recipe/${itemId}`);
    itemRef.remove();
  }

  componentDidMount(){
    const itemsRef = firebase.database().ref('recipe');
    itemsRef.on('value', (snapshot) => {
      let recipes = snapshot.val();
      let newState = [];

      for (let item in recipes) {
        newState.push({
          id: item,
          dishName: recipes[item].name,
          ingredients: recipes[item].ingredient
        });
      }
      this.setState({
        items: newState
      });
    });
  }


  render() {
    return (
      <div className = 'app'>
        <header>
          <div className = "wrapper"/>
          <h1>Add Recipes Here</h1>
        </header>
        <div className = 'container'>
          <section className = 'addItem'>
            <form onSubmit={this.handleSubmit}>
              <input type="text" name="dishName" placeholder="Dish Name" onChange={this.handleChange} value={this.state.dishName}/>
              <input type="text" name="ingredients" placeholder="Ingredient" onChange={this.handleChange} value={this.state.ingredients}/>
              <button>Add Recipe</button>
            </form>
          </section>
          <section className='display-item'>
            <div className='wrapper'>
              <ul>
                {this.state.items.map((item) => {
                  return(
                    <li key={item.id}>
                      <h3>{item.dishName}</h3>
                      <p>{item.ingredients}</p>
                      <button onClick={() => this.removeItem(item.id)}>X</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
        </div>
      </div>

    );
  }
}

export default App;
