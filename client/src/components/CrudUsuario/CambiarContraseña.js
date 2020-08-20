import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

// CSS
import "./CambiarContraseña.css";

//COMPONENTES
import NavBar from "../NavBar/NavBar.js";
import { logoutUser } from "../Redux/actions/userAction";

export default function CambiarContraseña() {
  const login = useSelector((state) => state.login.login);
  var userData = {};
  if (login.data) {
    userData = login.data.data.user;
  }
  var dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();

    var password = document.querySelector("#newPass").value;
    console.log(password);
    //POST A LOGIN USER
    if (password) {
      resetPassword(userData, password);
      dispatch(logoutUser());
    } else {
      alert("La nueva contraseña no puede estar vacia");
    }
    return <Link to={"/"}></Link>;
  }
  if (!login.data) {
    return <Redirect to="/" />;
  }
  return (
    <form className="container_info_user" onSubmit={handleSubmit}>
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Cambiar tu contraseña</h3>
      <div className="new_password">
        <label>Escribe tu contraseña actual: </label>
        <input type="password" />
        <label>Reescribe tu contraseña: </label>
        <input type="password" />
        <label>Nueva contraseña: </label>
        <input type="password" id="newPass" />
      </div>

      <div className="form_input_submit">
        <input type="submit" name="submit" value="INGRESAR" />
      </div>

      <div className="btn_data_user">
        <Link to="/usuario/config/" className="btn_volver_user">
          VOLVER
        </Link>
      </div>
    </form>
  );
}

function resetPassword(userData, new_password) {
  var id = userData.id;
  var pass = {
    password: new_password,
  };
  console.log(new_password);
  axios({
    method: "PUT",
    url: `http://localhost:3001/user/${id}/passwordReset`,
    data: pass,
  })
    .then(function (res) {
      console.log(res.data);
    })
    .catch((reason) =>
      console.log("No se pudo crear la cuenta de usuario " + reason)
    );
}
