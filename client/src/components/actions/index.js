import axios from "axios";
import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  GET_SECRET,
} from "./types";

export const oauthGoogle = (data) => {
  return async (dispatch) => {
    console.log("we received:", data);
    const res = await axios.post("http://localhost:5000/users/oauth/google", {
      access_token: data,
    });
    console.log("res", res);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const oauthFacebook = (data) => {
  return async (dispatch) => {
    console.log("we received:", data);
    const res = await axios.post("http://localhost:5000/users/oauth/facebook", {
      access_token: data,
    });
    console.log("res", res);
    dispatch({
      type: AUTH_SIGN_UP,
      payload: res.data.token,
    });
    localStorage.setItem("JWT_TOKEN", res.data.token);
    axios.defaults.headers.common["Authorization"] = res.data.token;
  };
};

export const signUp = (data) => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] signUp called");
      // Step 1: Use the data to make HTTP request to our back end
      const res = await axios.post("http://localhost:5000/users/signup", data);
      // Step 2: Take back end response
      console.log("res", res);

      // Step 3: Dispatch user just sign up
      console.log("[ActionCreator] signUp dispatch called");

      dispatch({
        type: "AUTH_SIGN_UP",
        payload: res.data.token,
      });
      // Step 4: Save jwtToken to LocalStorage
      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      });
      console.error("err", err);
    }
  };
};

export const signOut = () => {
  return (dispatch) => {
    localStorage.removeItem("JWT_TOKEN");
    axios.defaults.headers.common["Authorization"] = "";
    dispatch({
      type: AUTH_SIGN_OUT,
      payload: "",
    });
  };
};

export const signIn = (data) => {
  return async (dispatch) => {
    try {
      console.log("[ActionCreator] signIn called");
      // Step 1: Use the data to make HTTP request to our back end
      const res = await axios.post("http://localhost:5000/users/signin", data);
      // Step 2: Take back end response
      console.log("res", res);

      // Step 3: Dispatch user just sign up
      console.log("[ActionCreator] signIn dispatch called");

      dispatch({
        type: "AUTH_SIGN_IN",
        payload: res.data.token,
      });
      // Step 4: Save jwtToken to LocalStorage
      localStorage.setItem("JWT_TOKEN", res.data.token);
      axios.defaults.headers.common["Authorization"] = res.data.token;
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email and password combination not valid",
      });
      console.error("err", err);
    }
  };
};

export const getSecret = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:5000/users/secret");
      console.log("res", res);
      dispatch({
        type: GET_SECRET,
        payload: res.data.secret,
      });
    } catch (error) {
      console.error("err", error);
    }
  };
};
