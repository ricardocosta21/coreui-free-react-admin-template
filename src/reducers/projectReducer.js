const initState ={
    projects: [
        {id: '1', title: 'help me find peach', content: 'blah black'},
        {id: '2', title: 'help me find bananas', content: 'blah bananas'}
    ]
}

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_PROJECT_SUCCESS':
      console.log('create project success');
      
      return state;
    case 'CREATE_PROJECT_ERROR':
      console.log('create project error');
      return state;
    default:
      return state;
  }
};

export default projectReducer;