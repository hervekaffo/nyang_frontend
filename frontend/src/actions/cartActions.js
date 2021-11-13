import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_ADDRESS_NOTES,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, amount) => async (dispatch, getState) => {
  const { data } = await axios.get(`/nyang/meals/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      meal: data.mealId,
      name: data.name,
      image: data.picture,
      date: data.expirationDate,
      location: data.location,
      description: data.description,
      qty: data.qty,
      notes: data.notes,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveAddressAndNotes = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_ADDRESS_NOTES,
    payload: data,
  });

  localStorage.setItem("addressNotes", JSON.stringify(data));
};
