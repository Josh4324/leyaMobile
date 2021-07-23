import * as actionTypes from './auth-types';
import axios from 'axios';
let url = 'http://142.93.58.146:2708';

/** */

export const RegisterUser = (user) => async (dispatch) => {
  dispatch({
    type: actionTypes.REGISTER_USER,
    payload: user,
  });
  // console.log(user);
};

const RequestVerificationCode = () => async (dispatch) => {};

const VerifyCode = () => async (dispatch) => {};
