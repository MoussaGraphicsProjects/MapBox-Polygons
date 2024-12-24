import { combineReducers } from 'redux';
import {loginReducer} from './loginReducer';
import {polygonReducer} from './polygonReducer';
import { registerReducer } from './registerReducer';
import { usersReducer } from './usersReducer';

const rootReducer = combineReducers({
  LoginReducer: loginReducer,
  RegisterReducer: registerReducer,
  PolygonReducer: polygonReducer,
  UsersReducer: usersReducer,
});

export default rootReducer;
