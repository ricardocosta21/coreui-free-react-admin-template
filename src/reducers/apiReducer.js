const initState = {
  getError: "what",
  categories: [],
};

const apiReducer = (state = initState, {type, payload}) => {
  switch (type) {
    case "GET_ERROR":
      console.log("get error");
      return {
        ...state,
        getError: "get failed",
      };
    case "GET_SUCCESS":
    //   console.log("get reducer success  -> " + JSON.stringify(payload));
    //   console.log("Came hereReducer");
      return { ...state, categories: payload, hasError: '' }; // spread out any state, 
     

    default:
      return state;
  }
}

export default apiReducer;
