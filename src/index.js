import React from "react";
import { render } from "react-dom";
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker'
import App from "./App";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import { BrowserRouter } from 'react-router-dom';
// Browser router required inorder to use links on main page
render(
    <BrowserRouter>
        <App />
        </BrowserRouter>
    , document.getElementById("root"));

registerServiceWorker();
