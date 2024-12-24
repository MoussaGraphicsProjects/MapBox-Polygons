import axios from 'axios';
import config from '../../config';

export const register = (username:string, password:string) => async (dispatch:any) => {
  try {
    await axios.post(`${config.apiUrl}/auth/register`, { username, password });
    dispatch({ type: 'REGISTER_SUCCESS' });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({ type: 'REGISTER_FAIL', payload: error.response.data.message });
    } else {
      dispatch({ type: 'REGISTER_FAIL', payload: 'An unknown error occurred' });
    }
  }
};

export const login = (username:string, password:string) => async (dispatch:any) => {
  try {
    const response = await axios.post(`${config.apiUrl}/auth/login`, { username, password });
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.token });
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    } else {
      dispatch({ type: 'LOGIN_FAIL', payload: 'An unknown error occurred' });
    }
  }
};

export const logout = () =>  (dispatch:any) => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT_SUCCESS'});
};