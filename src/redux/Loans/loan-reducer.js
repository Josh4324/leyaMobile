import * as actionTypes from './loan-types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  products: [],
  loan: {},
  loans: [],
  selectedProduct: {},
  loanAmount: '',
  loanTenor: '',
  errors: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.LOADING:
      return { ...state, loading: true };

    case actionTypes.FETCH_LOAN_PRODUCTS:
      return { ...state, products: action.payload, loading: false };

    case actionTypes.SELECTED_LOAN:
      return { ...state, selectedProduct: action.payload, loading: false };

    case actionTypes.SET_LOAN_AMOUNT:
      return { ...state, loanAmount: action.payload, loading: false };

    case actionTypes.SET_LOAN_TENOR:
      return { ...state, loanTenor: action.payload, loading: false };

    case actionTypes.REQUEST_LOAN:
      return { ...state, loading: false, loan: action.payload };

    case actionTypes.GET_CUSTOMER_LOAN:
      return { ...state, loan: action.payload || {}, loading: false };

    case actionTypes.GET_ERRORS:
      return { ...state, errors: action.payload, loading: false };

    case actionTypes.CLEAR_ERRORS:
      return { ...state, errors: {} };

    case actionTypes.GET_LOAN_DETAILS:
      return { ...state, loan: action.payload, loading: false };

    default:
      return state;
  }
}
