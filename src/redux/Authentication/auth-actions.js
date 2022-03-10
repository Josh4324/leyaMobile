import * as actionTypes from "./auth-types";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

let url = "http://142.93.58.146:2708";

/** */

export const RegisterUser = (payload, navigate) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.post(
      "http://142.93.58.146:2708/v1/MobileUserProfile",
      payload
    );
    console.log(response.data);
    if (response.data.message === "Success") {
      dispatch({
        type: actionTypes.REGISTER_USER,
      });
      await AsyncStorage.setItem("onboarded", "true");
      const jsonValue = JSON.stringify(response.data.data);
      await AsyncStorage.setItem("userLoad", jsonValue);
      navigate("Success");
    }
  } catch (error) {
    console.log("err", error.response.data);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const LoginUser = (payload) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.post(
      "http://142.93.58.146:2708/v1/MobileUserProfile/authenticate",
      payload
    );

    if (response.data.message === "Success") {
      await AsyncStorage.setItem("onboarded", "true");
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: response.data.data,
      });

      await AsyncStorage.setItem("email", payload.userId);
      await AsyncStorage.setItem(
        "firstName",
        response.data.data.customer.firstName
      );
      // navigate('Home');
    }
    console.log(response.data);
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const LoginUser2 = (userId) => async (dispatch) => {
  try {
    console.log("dispatch");
    const url =
      "http://142.93.58.146:2708/v1/MobileUserProfile/UserId/" + String(userId);
    console.log(url);
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.get(url);
    if (response.data.message === "Success") {
      dispatch({
        type: actionTypes.LOGIN_USER,
        payload: response.data.data,
      });

      await AsyncStorage.setItem("email", String(userId));
      await AsyncStorage.setItem(
        "firstName",
        response.data.data.customer.firstName
      );
      // navigate('Home');
    }
    console.log(response.data);
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const UpdateUser = (payload, id, navigate) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.post(
      "http://142.93.58.146:9090/customer/UpdateCustomer",
      payload
    );
    console.log(response.data);
    if (response.data.responseCode === "00") {
      dispatch({ type: actionTypes.UPDATE_USER });
      dispatch(SetCurrentUser(id));
      navigate("Settings");
    }
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const SetCurrentUser = (id) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    const response = await axios.get(
      `http://142.93.58.146:2708/v1/MobileUserProfile/${id}`
    );
    if (response.data.code === 0) {
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: response.data.data,
      });
    }
  } catch (error) {
    console.log("err", error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: { message: error.response.data.message },
    });
  }
};

export const CompleteRegistation = () => async (dispatch) => {
  try {
    const userData = JSON.parse(await AsyncStorage.getItem("userLoad"));
    console.log("state user", userData);

    dispatch({
      type: actionTypes.COMPLETE_REGISTRATION,
      payload: userData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const RequestVerificationCode =
  (payload, navigate) => async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading());
      const response = await axios.post(
        "http://142.93.58.146:9091/generateOtp",
        payload
      );
      const { data } = response;
      console.log(response.data);
      if (data) {
        dispatch({
          type: actionTypes.REQUEST_VERIFICATION_CODE,
        });
        navigate("Verification");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.GET_ERRORS,
        payload: error.response.data,
      });
    }
  };

export const VerifyCode = (code, phone, navigate) => async (dispatch) => {
  try {
    dispatch(clearErrors());
    dispatch(setLoading());
    const response = await axios.get(
      `http://142.93.58.146:9091/validateOtp?otpnum=${code}&username=${phone}`
    );
    const { data } = response;
    console.log(data);
    if (data.code === "99") {
      return dispatch({
        type: actionTypes.GET_ERRORS,
        payload: { message: response.data.message },
      });
    } else {
      dispatch({
        type: actionTypes.VERIFY_CODE,
      });
      return navigate("Passcode");
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const LogoutUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT });
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
