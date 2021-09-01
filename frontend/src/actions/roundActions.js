import axios from "axios";

import {
  ROUND_LIST_REQUEST,
  ROUND_LIST_SUCCESS,
  ROUND_LIST_FAIL,
  ROUND_DETAILS_REQUEST,
  ROUND_DETAILS_SUCCESS,
  ROUND_DETAILS_FAIL,
} from "../constants/roundConstants";

export const listRounds = () => async (dispatch) => {
  try {
    dispatch({ type: ROUND_LIST_REQUEST });

    const { data } = await axios.get("/nyang/rounds");

    dispatch({
      type: ROUND_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROUND_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRoundDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ROUND_DETAILS_REQUEST });

    const { data } = await axios.get(`/nyang/rounds/${id}`);

    dispatch({
      type: ROUND_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROUND_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
