export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const CLEAR_PRODUCT = "CLEAR_PRODUCT";
export const SUBTOTAL_PRODUCT_CART = "SUBTOTAL_PRODUCT_CART";
export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const CLEAR_CART = "CLEAR_CART";
export const addToCart = (product) => (dispatch) => {
  dispatch({ type: ADD_TO_CART, payload: product });
};

export const clearProduct = (product) => (dispatch) => {
  // console.log("Inside clear products");
  console.log("Product: ", product);
  dispatch({
    type: CLEAR_PRODUCT,
    payload: product,
  });
};

export const subtotalItem = (cant) => {
  return (dispatch) => {
    dispatch({
      type: SUBTOTAL_PRODUCT_CART,
      payload: cant,
    });
  };
};

export const increaseQuantity = (product) => {
  console.log(product);
  return (dispatch) => {
    dispatch({
      type: INCREASE_QUANTITY,
      payload: product,
    });
  };
};
export const clearCart = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_CART,
    });
  };
};
