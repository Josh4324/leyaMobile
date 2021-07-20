import { combineReducers } from 'redux';
import AuthReducer from './Authentication/auth-reducer';

export default combineReducers({
  auth: AuthReducer,
});
