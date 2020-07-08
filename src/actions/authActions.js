import { auth, signInWithGoogle } from "../config/firebase";
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';


export const signIn = (e, credentials) => {
  return (dispatch, getState) => {
     const firebase = getFirebase();
    
     e.preventDefault();
    auth.signInWithEmailAndPassword(credentials.email, credentials.password).catch((error) => {
      // setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    }).then(() => {
      dispatch({ type: 'LOGIN_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });

  }
}