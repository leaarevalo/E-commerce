import axios from 'axios';

export const FETCH_ORDENES_REQUEST = "FETCH_ORDENES_REQUEST";
export const FETCH_ORDENES_SUCCESS = "FETCH_ORDENES_SUCCESS";
export const FETCH_ORDENES_ERROR = "FETCH_ORDENES_ERROR";


// Funcion creadora de la accion
export const fetchOrdenesRequest = () => {
  return {
    type: FETCH_ORDENES_REQUEST,
  };
};

export const setOrdenesSuccess = (ordenes) => {
  return {
    type: FETCH_ORDENES_SUCCESS,
    payload: ordenes,
  };
};

export const fetchOrdenesError = (error) => {
  return {
    type: FETCH_ORDENES_ERROR,
    payload: error,
  };
};


export const getOrdenes = () => {
  return (dispatch, getState) => {
    axios
      .get('http://localhost:3001/orden/')
      .then((res) => {
        const ordenes = res.data;
        dispatch(setOrdenesSuccess(ordenes));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchOrdenesError(errorMsg));
      });
  };
};
