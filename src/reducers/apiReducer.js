const initState = {
  contacts: [
    {
      id: "3",
      name: "cenas3",
    },
    {
      id: "2",
      name: "cenas2",
    },
  ],
}


const apiReducer = (state = initState, action) => {
  switch (action.type) {
   
    default:
      return state;
  }
};

export default apiReducer;
