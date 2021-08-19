import * as actionTypes from './Authentication/auth-types';

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ERRORS:
      return action.payload;
    case actionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};

export default errorReducer;
