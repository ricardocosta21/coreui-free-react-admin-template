const initState = {
  response: "",
  categories: [],
  products: [],
};

const apiReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, categories: payload, hasError: "" }; // spread out any state,

    case "GET_PRODUCTS_SUCCESS":
      return { ...state, products: payload, hasError: "" }; // spread out any state,

    case "POST_SUCCESS":
      console.log("post success");
      return {
        ...state,
        response: "post success",
      };

    case "DELETE_SUCCESS":
      console.log("delete success");
      return {
        ...state,
        response: "delete success",
      };

    case "GET_ERROR":
      console.log("get error");
      return {
        ...state,
        response: "get failed",
      };

    default:
      return state;
  }
};

export default apiReducer;
