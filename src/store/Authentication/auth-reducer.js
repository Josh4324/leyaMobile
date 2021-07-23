import * as actionTypes from './auth-types';
// import isEmpty from '../../utils/is-Empty';
const initialState = {
  isAuthenticated: false,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case actionTypes.LOGOUT:
      AsyncStorage.removeItem('jwtToken');
      return { ...state, isAuthenticated: false, user: {} };
    default:
      return state;
  }
}
