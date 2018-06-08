import { React, Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { Profile, Settings, Favorites, Main, Modal } from "./Index";
import App from '../../App.js';

const aMain = () => (
    <Switch>
        <Route exact path='/' component={App} />
        <Route path='/Profile' component={Profile} />
        <Route path='/' Settings component={Settings} />
    </Switch>
    )
