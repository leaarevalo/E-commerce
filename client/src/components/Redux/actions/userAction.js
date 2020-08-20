import axios from "axios";
export const SUCCESS_LOGIN = "SUCCESS_LOGIN";
export const FAIL_LOGIN = "FAIL_LOGIN";
export const LOGOUT_USER = "LOGOUT_USER";
export const UPDATE_USER = "UPDATE_USER";

export function loginUser(data) {
  return (dispatch) => {
    axios({
      method: "POST",
      url: "http://localhost:3001/user/login",
      data: data,
    })
      .then(function (res) {
        //console.log(res.data);
        dispatch(sucessLogin(res));
        alert("Se logueó con exito");
      })
      /* .then(function () {
              
            }) */
      .catch(function (reason) {
        console.log(reason);
        dispatch(failLogin(reason));
      });

    // alert("No se pudo crear la cuenta de usuario " + reason)
  };
}
/* export function updateUser(data) {
  return (dispatch) => {
    axios({
      method: "PUT",
      url: `http://localhost:3001/user/modify`,
      data: data,
    })
      .then(function (res) {
        dispatch(updateUser(res));
      })
      .catch((reason) =>
        console.log("No se pudo modificar los datos " + reason)
      );
  };
} */
/* export const updatedUSer = (user) => {
  return {
    type: UPDATE_USER,
    payload: user,
  };
};
 */
export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const sucessLogin = (data) => {
  return {
    type: SUCCESS_LOGIN,
    payload: data,
  };
};
export const failLogin = (data) => {
  return {
    type: FAIL_LOGIN,
    payload: data,
  };
};
