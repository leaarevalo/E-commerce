import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_ERROR,
  } from "../actions/categoryAction";
  
  const initialState = {
    categories: [],
    loading: false,
    error: "",
  };
  
  function categories(state = initialState, action) {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          loading: false,
          categories: action.payload,
          error: "",
        };
      case FETCH_CATEGORIES_ERROR:
        return {
          loading: false,
          categories: [],
          error: action.payload,
        };

      default:
        return state;
    }
  }
  
  export default categories;