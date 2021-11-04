import axios from "axios";

import {
  MEAL_LIST_REQUEST,
  MEAL_LIST_SUCCESS,
  MEAL_LIST_FAIL,
  MEAL_USER_LIST_REQUEST,
  MEAL_USER_LIST_SUCCESS,
  MEAL_USER_LIST_FAIL,
  MEAL_DETAILS_REQUEST,
  MEAL_DETAILS_SUCCESS,
  MEAL_DETAILS_FAIL,
  MEAL_DELETE_REQUEST,
  MEAL_DELETE_SUCCESS,
  MEAL_DELETE_FAIL,
  MEAL_CREATE_RESET,
  MEAL_CREATE_FAIL,
  MEAL_CREATE_SUCCESS,
  MEAL_CREATE_REQUEST,
  MEAL_UPDATE_REQUEST,
  MEAL_UPDATE_SUCCESS,
  MEAL_UPDATE_FAIL,
  MEAL_UPDATE_RESET,
  MEAL_CREATE_REVIEW_REQUEST,
  MEAL_CREATE_REVIEW_SUCCESS,
  MEAL_CREATE_REVIEW_FAIL,
  MEAL_CREATE_REVIEW_RESET,
  MEAL_TOP_REQUEST,
  MEAL_TOP_SUCCESS,
  MEAL_TOP_FAIL,
} from "../constants/mealConstants";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";
import { logout } from "./userActions";

//Get all the meals api call
export const listMeals = () => async (dispatch) => {
  try {
    dispatch({ type: MEAL_LIST_REQUEST });

    const { data } = await axios.get("/nyang/meals");

    dispatch({
      type: MEAL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Get a single meal api call
export const mealDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: MEAL_DETAILS_REQUEST });

    const { data } = await axios.get(`/nyang/meals/${id}`);

    dispatch({
      type: MEAL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MEAL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Create a meal API CALL
export const createMeal = (meal) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MEAL_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `/nyang/meals/${userInfo.userid}`,
      meal,
      config
    );

    dispatch({
      type: MEAL_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: MEAL_CREATE_FAIL,
      payload: message,
    });
  }
};
