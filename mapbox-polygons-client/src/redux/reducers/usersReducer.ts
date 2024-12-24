const initialState = {
    users: [],
    error: null,
  };
  
  export const usersReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'FETCH_USERS_SUCCESS':
        return { ...state, users: action.payload };
      case 'FETCH_USERS_FAIL':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  