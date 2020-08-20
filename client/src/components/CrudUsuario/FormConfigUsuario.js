import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// CSS
import "./FormConfigUsuario.css";
//COMPONENTES
import NavBar from "../NavBar/NavBar.js";

export default function FormConfigUsuario() {
  const { ordenes, setOrdenes } = useState([]);
  const login = useSelector((state) => state.login.login);
  console.log(login.data.data.user);
  var dataUser = login.data.data.user;
  useEffect(() => getOrdenes(login, setOrdenes), []);
  console.log(dataUser);
  function handleSubmit(e) {
    e.preventDefault();
    /* var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var adress = document.querySelector("#adress").value;
    var body = { name, email, password, adress };
    console.log(body); */
  }

  return (
    <div className="container_add_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Detalles de cuenta</h3>
      <div className="btn_user">
        <Link to={"/usuario/datos"} className="btn_1" dataUser={dataUser}>
          MIS DATOS
        </Link>
        <Link to={"/usuario/new_password"} className="btn_2">
          CAMBIAR CONTRASEÑA
        </Link>
        <Link to={"/usuario/ship_adress"} className="btn_3">
          AGREGAR DIRECCION DE ENVIO
        </Link>
        <Link to={"/usuario/orders"} className="btn_4">
          MIS PEDIDOS
        </Link>
        <Link to={"/usuario/reviews"} className="btn_5">
          MIS RESEÑAS
        </Link>
      </div>
    </div>
  );
}

function getOrdenes(login) {
  var id = login.data.data.user.id;
  axios({
    method: "GET",
    url: `http://localhost:3001/orden/${id}`,
  })
    .then(function (res) {
      console.log(res.data);
    })
    .catch((reason) =>
      console.log("No se pudo crear la cuenta de usuario " + reason)
    );
}

function resetPassword(login) {
  //recibe el password del input
  var id = login.data.data.user.id;
  var password = login.data.data.user.password;
  axios({
    method: "PUT",
    url: `http://localhost:3001/user/${id}/passwordReset`,
    data: password,
  })
    .then(function (res) {
      console.log(res.data);
    })
    .catch((reason) =>
      console.log("No se pudo crear la cuenta de usuario " + reason)
    );
}

function changeDataUser(login) {
  //LINK QUE LLEVE A LA PAGINA DE REGISTRO Y RETOME LOS DATOS
}
