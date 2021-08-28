import * as actionTypes from './investment-types';

const initialState = {
  products: [],
  investment: {},
  investments: [],
  investmentAmount: '',
  investmentTenor: '',
  errors: {},
  loading: false,
  masked: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };

    case actionTypes.MASK_AMOUNT:
      // console.log(state.masked);
      return { ...state, masked: !state.masked };

    case actionTypes.SET_INVESTMENT_AMOUNT:
      return { ...state, investmentAmount: action.payload, loading: false };

    case actionTypes.SET_INVESTMENT_TENOR:
      return { ...state, investmentTenor: action.payload, loading: false };

    case actionTypes.REQUEST_INVESTMENT:
      return { ...state, loading: false, investment: action.payload };

    case actionTypes.GET_CUSTOMER_INVESTMENTS:
      return { ...state, investments: action.payload || [], loading: false };

    case actionTypes.GET_INVESTMENT_DETAILS:
      return { ...state, investment: action.payload || {}, loading: false };

    case actionTypes.GET_ERRORS:
      return { ...state, errors: action.payload, loading: false };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, errors: {} };
    default:
      return state;
  }
}
