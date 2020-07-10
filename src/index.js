import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import rootReducer from "./reducers/rootReducer";

import thunk from 'redux-thunk'

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance} from "redux-firestore";
import { BrowserRouter } from "react-router-dom";

import fbConfig from "./config/firebase";

import { icons } from "./assets/icons";

React.icons = icons

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true,
};

if (!firebase.apps.length) {
    firebase.initializeApp(fbConfig);
}

firebase.firestore();

const store = createStore(rootReducer, applyMiddleware(thunk));

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance,
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
