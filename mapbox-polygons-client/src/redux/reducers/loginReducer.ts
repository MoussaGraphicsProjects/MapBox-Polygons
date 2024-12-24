const initialState = {
    token: null,
    isAuthenticated: false,
    error: null,
  };
  
  export const loginReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
        return { ...state, token: action.payload, isAuthenticated: true, error: null };
      case 'LOGIN_FAIL':
        return { ...state, token: null, isAuthenticated: false, error: action.payload };
        case 'LOGOUT_SUCCESS':
          return { ...state, token: null, isAuthenticated: false, error: null };
      default:
        return state;
    }
  };
  
  