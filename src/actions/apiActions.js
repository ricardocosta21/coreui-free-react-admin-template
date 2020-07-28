export const handleGetAll = (e) => {
  fetch(
    //  "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories"
    "https://localhost:5001/api/categories"
  )
    .then((res) => res.json())
    .then((data) => {
      // setContacts([...data]);
      return data;
    })
    .catch(console.log);
};


export const handlePost = (category) => {
  return (getState) => {
    fetch(
      // "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories",
      "https://localhost:5001/api/categories",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: Number(category.id),
          name: category.name,
        }),
      }
    ).then(() => {
      //this.handleGetAll();
    });

  };
};

// Put Message
// const handlePut = (e) => {
//   fetch(
//     //  "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?newName=" + newName,
//     "https://localhost:5001/api/categories?newName=" + newCategoryName,
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
    fetch(
      // "http://ec2-3-19-60-209.us-east-2.compute.amazonaws.com:8888/api/categories?id=" + id,
      "https://localhost:5001/api/categories?id=" + categoryId,
      {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      this.handleGetAll();
    });
    // e.preventDefault();
  };
};
