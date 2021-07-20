import * as actionTypes from './auth-actions';
import isEmpty from '../../utils/is-Empty';

const initialState = {
  isFirstTimeUser: true,
  completedOnboarding: false,
  agreedTerms: false,
  isAuthenticated: false,
  authVerification: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CODE_VERIFICATION:
      return { ...state, authVerification: true };
    case actionTypes.REQUEST_VERIFICATION_CODE:
      return { ...state };
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        isFirstTimeUser: false,
        completedOnboarding: true,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
