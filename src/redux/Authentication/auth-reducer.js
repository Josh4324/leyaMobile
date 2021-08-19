import * as actionTypes from './auth-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import isEmpty from '../../utils/is-Empty';
const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case actionTypes.COMPLETE_REGISTRATION:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        // user: action.payload,
        loading: false,
      };
    case actionTypes.SET_CURRENT_USER:
      return { ...state, loading: false, user: action.payload };
    case actionTypes.REQUEST_VERIFICATION_CODE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.VERIFY_CODE:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.GET_ERRORS:
      return { ...state, errors: action.payload, loading: false };
    case actionTypes.CLEAR_ERRORS:
      return { ...state, errors: {} };
    case actionTypes.LOADING:
      return { ...state, loading: true };
    case actionTypes.LOGOUT:
      AsyncStorage.removeItem('userLoad');
      return { ...state, isAuthenticated: false, user: {}, loading: false };
    default:
      return state;
  }
}
