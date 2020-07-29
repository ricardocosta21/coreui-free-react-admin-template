const initState = {
  response: "",
  categories: [],
};

const apiReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "GET_ERROR":
      console.log("get error");
      return {
        ...state,
        response: "get failed",
      };

      
    case "GET_SUCCESS":
      //   console.log("get reducer success  -> " + JSON.stringify(payload));
      //   console.log("Came hereReducer");
      return { ...state, categories: payload, hasError: "" }; // spread out any state,

    case "POST_SUCCESS":
      console.log("post success");
      return {
        ...state,

        response: "post success",
      };

    case "DELETE_ERROR":
      console.log("delete error");
      return {
        ...state,
        response: "delete failed",
      };

    case "DELETE_SUCCESS":
      console.log("delete success");
      return {
        ...state,
        
        response: "delete success",
      };

    default:
      return state;
  }
};

export default apiReducer;
