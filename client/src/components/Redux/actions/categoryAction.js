import axios from 'axios';

export const FETCH_CATEGORIES_REQUEST = "FETCH_CATEGORIES_REQUEST";
export const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
export const FETCH_CATEGORIES_ERROR = "FETCH_CATEGORIES_ERROR";


// Funcion creadora de la accion
export const fetchCategoriesRequest = () => {
  return {
    type: FETCH_CATEGORIES_REQUEST,
  };
};

export const setCategoriesSuccess = (categories) => {
  return {
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesError = (error) => {
  return {
    type: FETCH_CATEGORIES_ERROR,
    payload: error,
  };
};

export const getCategories = () => {
  return (dispatch, getState) => {
    axios
      .get('http://localhost:3001/category/')
      .then((res) => {
        const categories = res.data;
        dispatch(setCategoriesSuccess(categories));
      })
      .catch((error) => {
        const errorMsg = error.message;
        dispatch(fetchCategoriesError(errorMsg));
      });
  };
};
