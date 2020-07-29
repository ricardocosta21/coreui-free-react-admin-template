const apiConnection = "https://localhost:5001/api/categories";
// const apiConnection = "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"
//const testConnection = "http://www.colr.org/json/color/random";

//Get
export function handleGetCategories() {
  return function (dispatch) {
    return fetch(apiConnection)
      .then((response) => response.json())
      .then((json) => {
        //   console.log("Came here Actions");
        dispatch({ type: "GET_SUCCESS", payload: json });
      });
  };
};

// Post
export function handlePostCategories(category) {
  return function (dispatch) {
    return fetch(apiConnection, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(category.id),
        name: category.name,
      }),
    }).then(() => {
       dispatch({ type: "POST_SUCCESS" });
    }).then(() => {
       return fetch(apiConnection)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_SUCCESS", payload: json });
      });
  
    });
  };
};

// Delete
export function handleDeleteCategories(categoryId) {
  return function (dispatch) {
    return  fetch(apiConnection + "?id=" + categoryId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
       dispatch({ type: "DELETE_SUCCESS" });
    }).then(() =>  {
       return  fetch(apiConnection)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_SUCCESS", payload: json });
      });
  
    });
  };
};

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
