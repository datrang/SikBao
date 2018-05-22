import React from 'react';
import Home from './home';
import Profile from './profile';
import Favorites from './favorites';
import Settings from './settings'
import {Switch, Route} from 'react-router-dom';

const Main = () => (
  <Switch>
    <Route exact path = "/" component = {Home} />
    <Route path = "/profile" component = {Profile} />
    <Route path = "/favorites" component = {Favorites} />
    <Route path = "/settings" component = {Settings} />
  </Switch>
)

export default Main;
