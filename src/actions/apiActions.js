//local
//const apiConnection = "https://localhost:5001/api/";

//ecs instance
const apiConnection = "http://ec2-18-191-181-130.us-east-2.compute.amazonaws.com:8888/api/"

// CATEGORIES
//Get
// export function handleGetCategories(auth) {
//   return function (dispatch) {
//     return fetch(apiConnection + "categories")
//       .then((response) => response.json())
//       .then((json) => { 
//         //   console.log("Came here Actions");
//         // console.log("GET_CATEGORIES_SUCCESS: " + JSON.stringify({json}));
//         dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
//       });
//   };
// }

//Get
export function handleGetCategoriesByClientUID(auth) {
  return function (dispatch) {
    if (auth == null) {
      dispatch({ type: "GET_ERROR", payload: [] });
      return;
    }
    return fetch(apiConnection + "categories/" + auth.uid)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
      });
  };
}


// Post
export function handlePostCategories(category, auth) {
  return function (dispatch) {
    return fetch(apiConnection + "categories", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        clientUID: auth.uid,
        name: category.name,
      }),
    })
      .then(() => {
        return fetch(apiConnection + "categories/" + auth.uid)
          .then((response) => response.json())
          .then((json) => {
            dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
          });
      });
  };
}

// Delete
export function handleDeleteCategories(category, auth) {
  return function (dispatch) {
    return fetch(apiConnection + "categories", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(category.id),
        name: category.name,
        clientUID: auth.uid,
      }),
    }).then(() => {
      return fetch(apiConnection + "categories/" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: json });
        });
     }).then(() => {
      return fetch(apiConnection + "products?categoryId=" + category.id + "&clientUID=" + auth.uid)
      .then((response) => response.json())
      .then((json) => {
        // console.log("GET_PRODUCTS_SUCCESS: " + JSON.stringify({json}));
        dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
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

//Get with Category ID
export function handleGetProductsWithId(category, auth) {
  return function (dispatch) {
    if (category == null) {
      
      dispatch({ type: "GET_PRODUCTS_ERROR", payload: [] });
      return;
    }
    // console.log("LIKE WHAAAT?!" + JSON.stringify({category}));
    return fetch(apiConnection + "products?categoryId=" + category.id + "&clientUID=" + auth.uid)
      .then((response) => response.json())
      .then((json) => {
        // console.log("GET_PRODUCTS_SUCCESS: " + JSON.stringify({json}));
        dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
      });
  };
}

//Get with Category ID
export function handleClearProducts() {
  return function (dispatch) {
    dispatch({ type: "GET_PRODUCTS_ERROR", payload: [] });
    return;
  };
}

// Post
export function handlePostProducts(product, auth) {
  return function (dispatch) {
        // console.log("prod added: " + JSON.stringify(product.quantity));

    return fetch(apiConnection + "products", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: product.name,
        clientUID: auth.uid,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
      }),
    }).then(() => {
      return fetch(apiConnection + "products?categoryId=" + product.categoryId + "&clientUID=" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
        });
    });
  };
}

// Delete
export function handleDeleteProducts(product, auth) {
  return function (dispatch) {
    var quantity = 1;
    return fetch(apiConnection + "products", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(product.id),
        name: product.name,
        clientUID: auth.uid,
        price: product.price,
        quantity: quantity,
        categoryId: product.categoryId,
      }),
    }).then(() => {
      return fetch(apiConnection + "products?categoryId=" + product.categoryId + "&clientUID=" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
        });
    });
  };
}





// Basket Products
// here
//Get with auth.UID
export function handleGetBasketProductsForUser(auth) {
  return function (dispatch) {
    if (auth == null) {
      dispatch({ type: "GET_ERROR", payload: [] });
      return;
    }
    return fetch(apiConnection + "basket?clientUID=" + auth.uid)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_BASKET_PRODUCTS_SUCCESS", payload: json });
      });
  };
}

// Add Product to Cart
export function handleAddToCart(product, auth) {
  return function (dispatch) {
    return fetch(apiConnection + "basket", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(product.id),
        name: product.name,
        clientUID: auth.uid,
        price: product.price,
        quantity: product.quantity,
        categoryId: product.categoryId,
      }),
    }).then(() => {
      return fetch(apiConnection + "basket?clientUID=" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_BASKET_PRODUCTS_SUCCESS", payload: json });
        });
    });
  };
}



// Decrement
export function handleDecrementBasketProduct(productId, auth) {
  return function (dispatch) {
    return fetch(apiConnection + "basket?id=" + productId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      return fetch(apiConnection + "basket?clientUID=" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_BASKET_PRODUCTS_SUCCESS", payload: json });
        });
    });
  };
}

// Delete
export function handleDeleteBasketProduct(productId, auth) {
  return function (dispatch) {
    return fetch(apiConnection + "basket?id=" + productId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      return fetch(apiConnection + "basket?clientUID=" + auth.uid)
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_BASKET_PRODUCTS_SUCCESS", payload: json });
        });
    });
  };
}

// // Add Product to Cart
// export function handleAddToCart(product, auth) {
//   return function (dispatch) {
//     console.log(auth.uid);
//     return fetch(apiConnection + "basket", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         id: Number(product.id),
//         name: product.name,
//         clientUID: auth.uid,
//         price: product.price,
//         categoryId: product.categoryId,
//       }),
//     })
//       .then(() => {
//         return fetch(apiConnection + "basket?categoryId=" + product.categoryId)
//           .then((response) => response.json())
//           .then((json) => {
//             dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: json });
//           });
//       });
//   };
// }
