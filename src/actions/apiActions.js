const apiConnection = "https://localhost:5001/api/categories";
// const apiConnection = "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"
//const testConnection = "http://www.colr.org/json/color/random";

export function handleGetCategories() {
  return async function(dispatch) {
    return  fetch(apiConnection).then(response => response.json())
      .then(json => {
        //   console.log("Came here Actions");
        dispatch({ type: "GET_SUCCESS", payload: json });
      });
  };
}

export const handlePost = (category) => {
  return (getState) => {
    fetch(apiConnection, {
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
      //this.handleGetCategories();
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

export const handleDelete = (categoryId) => {
  return (getState) => {
    fetch(apiConnection + categoryId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      this.handleGetCategories();
    });
    // e.preventDefault();
  };
};
