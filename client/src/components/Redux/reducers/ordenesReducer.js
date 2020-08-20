import {
    FETCH_ORDENES_REQUEST,
    FETCH_ORDENES_SUCCESS,
    FETCH_ORDENES_ERROR,
  } from "../actions/ordenesAction.js";
  
  const initialState = {
    ordenes: [],
    loading: false,
    error: "",
  };
  
  function ordenes(state = initialState, action) {
    switch (action.type) {
      case FETCH_ORDENES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_ORDENES_SUCCESS:
        return {
          loading: false,
          ordenes: action.payload,
          error: "",
        };
      case FETCH_ORDENES_ERROR:
        return {
          loading: false,
          ordenes: [],
          error: action.payload,
        };

      default:
        return state;
    }
  }
  
  export default ordenes;