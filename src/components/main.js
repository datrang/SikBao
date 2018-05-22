import React from 'react';
import LandingPage from './landingpage';
import Profile from './profile';
import Settings from './settings'
import {Switch, Route} from 'react-router-dom';

const Main = () => (
  <Switch>
    <Route exact path = "/" component = {LandingPage} />
  </Switch>
)

export default Main;
