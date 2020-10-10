import firebase from "firebase/app";
import "firebase/auth";

import { generateUserDocument } from "../config/firebase";

// export const signIn = (credentials) => {
//   return (dispatch, getState) => {
//     firebase
//       .auth()
//       .signInWithEmailAndPassword(credentials.email, credentials.password)
//       .then(() => {
//         dispatch({ type: "LOGIN_SUCCESS" });
//       })
//       .catch((err) => {
//         dispatch({ type: "LOGIN_ERROR", err });
//       });
//   };
// };

export const signIn = (credentials) => {
  return (dispatch, getState) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
        firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
          .then(() => {
            dispatch({ type: "LOGIN_SUCCESS" });
          })
          .catch((err) => {
            dispatch({ type: "LOGIN_ERROR", err });
          });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        generateUserDocument(newUser, resp.user.uid, newUser.firstName);
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch((err) => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  return (dispatch, getState) => {
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        firebase
          .auth()
          .signInWithPopup(provider)
          .then((resp) => {
            generateUserDocument(resp.user, resp.user.uid);
          });
      });
  };
};

export const signOut = (credentials) => {
  return (dispatch, getState) => {
    // console.log(credentials + " logged in");
    //this is an async method. That why the then method.
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};
