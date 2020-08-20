import { combineReducers } from "redux";
import products from "./productsReducer.js";
import categories from "./categoryReducer.js";
import cart from "./cartReducer.js";
import ordenes from "./ordenesReducer.js";
import login from "./userReducer.js";

const rootReducer = combineReducers({
  products,
  categories,
  cart,
  ordenes,
  login,
});
export default rootReducer;
