import {
  ROUND_LIST_REQUEST,
  ROUND_LIST_SUCCESS,
  ROUND_LIST_FAIL,
  ROUND_DETAILS_REQUEST,
  ROUND_DETAILS_SUCCESS,
  ROUND_DETAILS_FAIL,
} from "../constants/roundConstants";

export const roundListReducer = (state = { rounds: [] }, action) => {
  switch (action.type) {
    case ROUND_LIST_REQUEST:
      return { loading: true, rounds: [] };
    case ROUND_LIST_SUCCESS:
      return {
        loading: false,
        rounds: action.payload,
      };
    case ROUND_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const roundDetailsReducer = (state = { round: {} }, action) => {
  switch (action.type) {
    case ROUND_DETAILS_REQUEST:
      return { loading: true, ...state };
    case ROUND_DETAILS_SUCCESS:
      return {
        loading: false,
        round: action.payload,
      };
    case ROUND_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
