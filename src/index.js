import React from "react";
import ReactDOM from "react-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlus,
  faChevronLeft,
  faTrashAlt,
  faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";
import { Router } from "react-router-dom";
import "typeface-roboto";
import "./index.css";
import App from "./App/App";
import history from "./history";

library.add(faPlus, faChevronLeft, faTrashAlt, faCheckDouble);

ReactDOM.render(
  <Router history={history}>
    <App />
  </Router>,
  document.getElementById("root")
);
