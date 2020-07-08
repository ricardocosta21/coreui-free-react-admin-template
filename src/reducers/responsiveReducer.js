import { createStore } from "redux";
import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../config/firebase";

export const UserContext = createContext({ user: null });


const initialState = {
  sidebarShow: "responsive",
};

// const state = {
//   user: null,
// };

const responsiveReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default responsiveReducer;
