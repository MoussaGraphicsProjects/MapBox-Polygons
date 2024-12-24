import { combineReducers } from 'redux';
import {loginReducer} from './loginReducer';
import {polygonReducer} from './polygonReducer';
import { registerReducer } from './registerReducer';

const rootReducer = combineReducers({
  LoginReducer: loginReducer,
  RegisterReducer: registerReducer,
  PolygonReducer: polygonReducer,
});

export default rootReducer;
