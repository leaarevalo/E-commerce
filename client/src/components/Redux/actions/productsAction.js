import axios from "axios";

export const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
export const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
export const FETCH_PRODUCTS_ERROR = "FETCH_PRODUCTS_ERROR";
export const FETCH_PRODUCT_SUCCESS = "FETCH_PRODUCT_SUCCESS";

// Funcion creadora de la accion
export const fetchProductsRequest = () => {
  return {
    type: FETCH_PRODUCTS_REQUEST,
  };
};

export const setProductsSuccess = (products) => {
  return {
    type: FETCH_PRODUCTS_SUCCESS,
    payload: products,
  };
};

export const setProductSuccess = (product) => {
  return {
    type: FETCH_PRODUCT_SUCCESS,
    payload: product,
  };
};

const fetchUsersError = (error) => {
  return {
    type: FETCH_PRODUCTS_ERROR,
    payload: error,
  };
};

export function getProducts() {
  return (dispatch, getSate) => {
    axios
      .get("http://localhost:3001/product/")
      .then((res) => {
        const products = res.data;
        dispatch(setProductsSuccess(products));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchUsersError(errorMsg));
      });
  };
}
  export function getProduct(id) {
    return (dispatch, getSate) => {
      axios
        .get("http://localhost:3001/product/"+id)
        .then((res) => {
          const product = res.data;
          dispatch(setProductSuccess(product));
        })
        .catch((error) => {
          const errorMsg = error.message;
          dispatch(fetchUsersError(errorMsg));
        });
    };
}

