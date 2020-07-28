const initState = {
  getError: null,
};

const apiReducer = (state = initState, action) => {
  switch (action.type) {
   
    case "GET_ERROR":
      console.log("get error");
      return {
        ...state,
        getError: "get failed",
      };
    case "GET_SUCCESS":
      console.log("get success");
      return {
        ...state,
        getError: null,
      };

    default:
      return state;
  }
};

export default apiReducer;
