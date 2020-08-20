import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Redux/actions/userAction.js";

// CSS
import "./FormCreateUsuario.css";
//COMPONENTES
import NavBar from "../NavBar/NavBar.js";

export default function FormCreateUsuario() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  console.log(login);
  function handleSubmit(e) {
    e.preventDefault();
    var email = document.querySelector("#email").value;
    var password = document.querySelector("#password").value;
    var body = { email, password };
    console.log(body);
    //POST A LOGIN USER
    dispatch(loginUser(body));
    return <Link to={"/"}></Link>;
  }
  if (login.data) {
    //Esto esta redireccionando
    return <Redirect to="/" />;
  }
  return (
    <div className="container_add_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Login</h3>
      <h5>
        Si ya tenes cuenta, ingresa tu usuario y contraseña.
        {/* Bienvenido a Natalia Torres. Registrate y sé parte de nuestra tienda
        online. */}
      </h5>
      <form className="usuario_form" onSubmit={handleSubmit}>
        <div className="user_input_name">
          <label>Email:</label>
          <input
            id="email"
            type="text"
            name="name"
            placeholder="Ingrese su nombre"
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

        <div className="form_input_submit">
          <input type="submit" name="submit" value="INGRESAR" />
        </div>
      </form>
    </div>
  );
}
