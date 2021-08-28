import * as actionTypes from './investment-types';
import axios from 'axios';

export const SetInvestmentAmount = (amount) => (dispatch) => {
  console.log('amt', amount);
  dispatch({
    type: actionTypes.SET_INVESTMENT_AMOUNT,
    payload: amount,
  });
};

export const SetInvestmentTenor = (tenor) => (dispatch) => {
  console.log('tenor', tenor);
  dispatch({
    type: actionTypes.SET_INVESTMENT_TENOR,
    payload: tenor,
  });
};

export const RequestInvestment = (payload, navigate) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.post(
      'http://142.93.58.146:9097/v1/Investment/',
      payload
    );
    console.log(response.data);
    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.REQUEST_INVESTMENT,
        payload: response.data.data.investment,
      });

      navigate('InvestmentSuccess');
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const GetCustomerInvestments = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.get(
      `http://142.93.58.146:9097/v1/Investment/Customer/${id}`
    );
    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.GET_CUSTOMER_INVESTMENTS,
        payload: response.data.data.investments,
      });
    }
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const setLoading = () => {
  return {
    type: actionTypes.LOADING,
  };
};

export const MaskAmount = () => {
  return {
    type: actionTypes.MASK_AMOUNT,
  };
};
export const clearErrors = () => {
  return {
    type: actionTypes.CLEAR_ERRORS,
  };
};
