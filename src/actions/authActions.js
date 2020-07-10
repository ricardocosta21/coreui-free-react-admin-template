import firebase from "firebase/app";
import "firebase/auth";

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
}

export const signOut = () => {
  return (dispatch, getState) => {
    console.log("logged Te logooooo");
    //this is an async method. That why the then method.
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}