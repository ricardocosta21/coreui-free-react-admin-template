const apiConnection = "https://localhost:5001/api/categories";
// const apiConnection = "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"



export const handleGetAll = (e) => {
  return async (dispatch, getState) => {
    fetch(apiConnection)
      .then((res) => res.json())
      .then((data) => {
        // setContacts([...data]);
         dispatch({type: 'GET_SUCCESS', payload: data })
        console.log(data);
        return data
      })
      .then(() => {
        dispatch({ type: "GET_SUCCESS"});
      })
      .catch((err) => {
        dispatch({ type: "GET_ERROR", err });
      });
  };
};






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
      //this.handleGetAll();
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
      this.handleGetAll();
    });
    // e.preventDefault();
  };
};
