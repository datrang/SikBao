import React from "react";
import { render } from "react-dom";
import App from "./App";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {BrowserRouter} from 'react-router-dom';

render(
  <BrowserRouter>
<App />
  </BrowserRouter>
, document.getElementById("root"));
