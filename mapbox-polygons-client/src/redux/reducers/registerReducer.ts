const initialState = {
    result:false,
    error: null,
  };
  
  export const registerReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'REGISTER_SUCCESS':
        return { ...state, result:true, error: null };
      case 'REGISTER_FAIL':
        return { ...state, result:false, error: action.payload };
      default:
        return state;
    }
  };
  
  