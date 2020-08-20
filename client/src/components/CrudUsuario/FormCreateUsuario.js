import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

// CSS
import "./FormCreateUsuario.css";
//COMPONENTES
import NavBar from "../NavBar/NavBar.js";

export default function FormCreateUsuario() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var adress = document.querySelector("#adress").value;
    var body = { name, email, password, adress };
    console.log(body);
    axios({
      method: "POST",
      url: "http://localhost:3001/user/add",
      data: body,
    })
      .then(function (res) {
        console.log(res.data);
        alert("La cuenta se creo con éxito");
      })
      .then(function () {
        window.location.replace("../../");
      })
      .catch((reason) =>
        alert("No se pudo crear la cuenta de usuario " + reason)
      );
  }

  return (
    <div className="container_add_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Nuevos Clientes</h3>
      <h5>
        Bienvenido a Natalia Torres. Registrate y sé parte de nuestra tienda
        online.
      </h5>
      <form className="usuario_form" onSubmit={handleSubmit}>
        <div className="user_input_name">
          <label>Nombre:</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Ingrese su nombre"
          />
        </div>
        <div className="user_input_name">
          <label>email:</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Ingrese su email"
          />
        </div>
        <div className="user_input_name">
          <label>Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Ingrese una contraseña"
          />
        </div>
        <div className="user_input_name">
          <label>Domicilio:</label>
          <input
            id="adress"
            type="text"
            name="adress"
            placeholder="Ingrese su domicilio"
          />
        </div>

        <div className="form_input_submit">
          <input type="submit" name="submit" value="REGISTRARSE" />
        </div>
      </form>
    </div>
  );
}
