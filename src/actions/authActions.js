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

export const signInWithGoogle = (credentials) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return (dispatch, getState) => {
    firebase.auth().signInWithPopup(provider);
  }
}


export const signOut = (credentials) => {
  return (dispatch, getState) => {
    console.log(credentials + " logged Te logooooo");
    //this is an async method. That why the then method.
    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
}