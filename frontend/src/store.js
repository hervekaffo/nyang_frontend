import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  roundListReducer,
  roundDetailsReducer,
} from "./reducers/roundReducers";
import { cartReducer } from "./reducers/cartReducers";

import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducers";

import {
  mealCreateReducer,
  mealDeleteReducer,
  mealDetailsReducer,
  mealListByUserReducer,
  mealListReducer,
  mealReviewCreateReducer,
  mealTopRatedReducer,
  mealUpdateReducer,
} from "./reducers/mealReducers";

const reducer = combineReducers({
  //round reducers
  roundList: roundListReducer,
  roundDetails: roundDetailsReducer,
  //cart reducer
  cart: cartReducer,
  //user reducers
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  //meal reducers
  mealCreate: mealCreateReducer,
  mealDelete: mealDeleteReducer,
  mealDetails: mealDetailsReducer,
  mealListByUser: mealListByUserReducer,
  mealList: mealListReducer,
  mealReviewCreate: mealReviewCreateReducer,
  mealTopRated: mealTopRatedReducer,
  mealUpdate: mealUpdateReducer,
  mealByUser: mealListByUserReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    userLogin: { userInfo: userInfoFromStorage },
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
