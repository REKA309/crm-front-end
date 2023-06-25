// userReducer.js

const initialState = {
    useremail: ''
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_EMAIL':
        return {
          ...state,
          useremail: action.payload
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  