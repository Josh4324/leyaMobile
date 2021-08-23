import * as actionTypes from './loan-types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FetchLoanProducts = () => async (dispatch) => {
  try {
    dispatch(clearErrors());
    const response = await axios.get(
      'http://142.93.58.146:9095/LoanProduct/v1/products?delFlg=0'
    );
    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.FETCH_LOAN_PRODUCTS,
        payload: response.data.products,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const RequestLoan = (payload, navigate) => async (dispatch) => {
  try {
    dispatch(setLoading());
    dispatch(clearErrors());
    const response = await axios.post(
      'http://142.93.58.146:9095/Loan/v1/requestLoan',
      payload
    );

    console.log(response.data);
    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.REQUEST_LOAN,
        payload: response.data.loanDetails,
      });
      navigate('LoanSuccess');
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const GetCustomerLoans = (id) => async (dispatch) => {
  // console.log('cID', id);
  try {
    dispatch(setLoading());
    dispatch(clearErrors());
    const response = await axios.get(
      `http://142.93.58.146:9095/Loan/v1/getLoansByCustomer?custNo=${id}`
    );

    // console.log(response.data.loans);

    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.GET_CUSTOMER_LOAN,
        payload: response.data.loans[0],
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const SelectedLoan = (selected) => (dispatch) => {
  console.log(selected);
  dispatch({ type: actionTypes.SELECTED_LOAN, payload: selected });
};

export const SetLoanAmount = (amount) => (dispatch) => {
  console.log('amt', amount);
  dispatch({
    type: actionTypes.SET_LOAN_AMOUNT,
    payload: amount,
  });
};

export const SetLoanTenor = (tenor) => (dispatch) => {
  console.log('tenor', tenor);
  dispatch({
    type: actionTypes.SET_LOAN_TENOR,
    payload: tenor,
  });
};

export const setLoading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
