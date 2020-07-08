import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { icons } from "./assets/icons";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from "react-redux";
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/firebase'
import thunk from 'redux-thunk'
// import store from './store'
import rootReducer from "./reducers/rootReducer";

// React.icons = icons;

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk)
    // reactReduxFirebase(fbConfig), // redux binding for firebase
    // reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
