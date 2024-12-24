import axios from 'axios';
import config from '../../config';

export interface Polygon {
  id: string;
  title: string;
  coordinates: number[][];
}

interface FetchPolygonsSuccessAction {
  type: 'FETCH_POLYGONS_SUCCESS';
  payload: Polygon[];
}

interface FetchPolygonsFailAction {
  type: 'FETCH_POLYGONS_FAIL';
  payload: string;
}

interface AddPolygonsSuccessAction {
  type: 'ADD_POLYGON_SUCCESS';
  payload: Polygon[];
}

interface AddPolygonsFailAction {
  type: 'ADD_POLYGON_FAIL';
  payload: string;
}

type PolygonAction = FetchPolygonsSuccessAction | FetchPolygonsFailAction | AddPolygonsFailAction | AddPolygonsSuccessAction;

export const fetchPolygons = () => async (dispatch: (action: PolygonAction) => void) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get<Polygon[]>(`${config.apiUrl}/polygons/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'FETCH_POLYGONS_SUCCESS', payload: response.data });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({ type: 'FETCH_POLYGONS_FAIL', payload: error.response.data.message });
    } else {
      dispatch({ type: 'FETCH_POLYGONS_FAIL', payload: 'An unknown error occurred' });
    }
  }
};

export const addPolygon = (polygon:Polygon) => async (dispatch:(action: PolygonAction) => void) => {
  try {
    const token = localStorage.getItem('token');
    await axios.post(`${config.apiUrl}/polygons/post`, polygon, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: 'ADD_POLYGON_SUCCESS', payload: [polygon] });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({ type: 'ADD_POLYGON_FAIL', payload: error.response.data.message });
    } else {
      dispatch({ type: 'ADD_POLYGON_FAIL', payload: 'An unknown error occurred' });
    }
  }
};
