import axios from "axios";
import { AUTH_SIGN_UP, AUTH_ERROR } from "./types";
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
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: "Email is already in use",
      });
      console.error("err", err);
    }
  };
};
