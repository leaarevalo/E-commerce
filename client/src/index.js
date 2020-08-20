import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
// import './index.css';
import "./main.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Fonts
import "./fonts/Graphik/stylesheet.css";
import "./fonts/Nanum/stylesheet.css";

// Redux
import store from "./components/Redux/store.js";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
