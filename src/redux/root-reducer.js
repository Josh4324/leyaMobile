import { combineReducers } from 'redux';
import AuthReducer from './Authentication/auth-reducer';
import LoanReducer from './Loans/loan-reducer';
import AlertReducer from './Alert/alert-reducer';
import ErrorReducer from './error-reducer';

export default combineReducers({
  auth: AuthReducer,
  errors: ErrorReducer,
  alert: AlertReducer,
  loans: LoanReducer,
});
