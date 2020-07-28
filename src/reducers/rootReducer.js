import responsiveReducer from "./responsiveReducer"
import projectReducer from "./projectReducer"
import authReducer from "./authReducer"
import apiReducer from "./apiReducer"
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    responsive: responsiveReducer,
    project: projectReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    api: apiReducer
});

export default rootReducer;