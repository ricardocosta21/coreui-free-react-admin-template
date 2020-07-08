import responsiveReducer from "./responsiveReducer"
import projectReducer from "./projectReducer"
import authReducer from "./authReducer"
import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase"
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    responsive: responsiveReducer,
    project: projectReducer,
    auth: authReducer,
    firebase: firebaseReducer
});

export default rootReducer;