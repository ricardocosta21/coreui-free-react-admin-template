const apiConnection = "https://localhost:5001/api/";
// const apiConnection = "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/"


// CATEGORIES
//Get
export function handleGetCategories() {
  return function (dispatch) {
    return fetch(apiConnection + "categories")
      .then((response) => response.json())
      .then((json) => {
        //   console.log("Came here Actions");
        // console.log("GET_CATEGORIES_SUCCESS: " + JSON.stringify({json}));
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
      });
  };
}

// Post
export function handlePostCategories(category) {
  return function (dispatch) {
    return fetch(apiConnection + "categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(category.id),
        name: category.name,
      }),
    })
      .then(() => {
        dispatch({ type: "POST_SUCCESS" });
      })
      .then(() => {
        return fetch(apiConnection + "categories")
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
          });
      });
  };
}

// Delete
export function handleDeleteCategories(categoryId) {
  return function (dispatch) {
    return fetch(apiConnection  + "categories?id=" + categoryId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        dispatch({ type: "DELETE_SUCCESS" });
      })
      .then(() => {
        return fetch(apiConnection + "categories")
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
          });
      });
  };
}

// Put Message
// const handlePut = (e) => {
//   fetch(
//     //  apiConnection + newCategoryName,
//     {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: Number(categoryId),
//         name: categoryName,
//       }),
//     }
//   ).then(() => {
//     handleGetAll();
//   });

//   e.preventDefault();
// };

// PRODUCTS

//Get
// export function handleGetProducts() {
//   return function (dispatch) {
//     return fetch(apiConnection + "products")
//       .then((response) => response.json())
//       .then((json) => {
//         //   console.log("Came here Actions");
//         // console.log("GET_PRODUCTS_SUCCESS: " + JSON.stringify({json}));
//         dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
//       });
//   };
// }

export function handleGetProductsWithId(category) {
 return function (dispatch) {
    return fetch(apiConnection  + "products?categoryId=" + category.id)
      .then((response) => response.json())
      .then((json) => {
        //console.log("GET_PRODUCTS_SUCCESS: " + JSON.stringify({json}));
        dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
      });
  };
}

// export function handleGetProducts() {
//   return function (dispatch) {
//     return fetch(apiConnection + "products")
//       .then((response) => response.json())
//       .then((json) => {
//         //   console.log("Came here Actions");
//         // console.log("GET_PRODUCTS_SUCCESS: " + JSON.stringify({json}));
//         dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
//       });
//   };
// }

// Post
export function handlePostProducts(product) {
  return function (dispatch) {
    return fetch(apiConnection + "products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
      }),
    })
      .then(() => {
        dispatch({ type: "POST_SUCCESS" });
      })
      .then(() => {
        return fetch(apiConnection + "products")
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
          });
      });
  };
}

// Delete
export function handleDeleteProducts(product) {
  return function (dispatch) {
    return fetch(apiConnection  + "products", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(product.id),
        name: product.name,
        price: product.price,
        categoryId: product.categoryId,
      }),
    })
      .then(() => {
        dispatch({ type: "DELETE_SUCCESS" });
      })
      .then(() => {
        return fetch(apiConnection + "products")
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
          });
      });
  };
}
