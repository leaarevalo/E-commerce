import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

// CSS
import "./DatosUsuario.css";

//COMPONENTES
import NavBar from "../NavBar/NavBar.js";

export default function DatosUsuario() {
  const userData = useSelector((state) => state.login.login.data.data.user);
  function handleSubmit(e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var adress = document.querySelector("#adress").value;
    var email = document.querySelector("#email").value;
    console.log("Se ejecuta");
    //POST A LOGIN USER
    if (name && adress && email) {
      var user = {
        id: userData.id,
        name: name,
        adress: adress,
        email: email,
      };
      updateUser(user);
    } else {
      alert("Debe completar todos los campos");
    }
    return <Link to={"/"}></Link>;
  }
  return (
    <form className="container_info_user" onSubmit={handleSubmit}>
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Mis datos personales</h3>
      <div className="data_user">
        <label>Nombre: </label>
        <input placeholder={userData.name} id="name" />
        <label>Domicilio: </label>
        <input placeholder={userData.adress} id="adress" />
        <label>email: </label>
        <input value={userData.email} id="email" />
      </div>
      <div className="form_input_submit">
        <input type="submit" name="submit" value="CAMBIAR DATOS" />
      </div>
      <div className="btn_data_user">
        <Link to="/usuario/config/" className="btn_volver_user">
          VOLVER
        </Link>
      </div>
    </form>
  );
}

function updateUser(data) {
  axios({
    method: "PUT",
    url: `http://localhost:3001/user/modify`,
    data: data,
  })
    .then(function (res) {
      alert("Sus datos se actualizaran la proxima vez que inicie sesion");
      console.log(res);
    })
    .catch((reason) => console.log("No se pudo modificar los datos " + reason));
}
