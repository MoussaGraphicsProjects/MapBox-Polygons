const initialState = {
    polygons: [],
    error: null,
  };
  
  export const polygonReducer = (state = initialState, action:any) => {
    switch (action.type) {
      case 'FETCH_POLYGONS_SUCCESS':
        return { ...state, polygons: action.payload };
      case 'FETCH_POLYGONS_FAIL':
        return { ...state, error: action.payload };
      case 'ADD_POLYGON_SUCCESS':
        return { ...state, polygons: [...state.polygons, action.payload[0]] };
      case 'ADD_POLYGON_FAIL':
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  