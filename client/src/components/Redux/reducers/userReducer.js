import {
  SUCCESS_LOGIN,
  FAIL_LOGIN,
  LOGOUT_USER,
  UPDATE_USER,
} from "../actions/userAction.js";

const initialState = {
  login: {},
};

function login(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case FAIL_LOGIN:
      return {
        ...state,
        login: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        login: {},
      };
    default:
      return state;
  }
}

export default login;
