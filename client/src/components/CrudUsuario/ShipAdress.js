import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// CSS
import "./ShipAdress.css";

//COMPONENTES
import NavBar from "../NavBar/NavBar.js";

export default function ShipAdress() {
  function handleSubmit(e) {
    alert("Direccion de envio agregada");
    document.querySelector("#direccion").value = "";
  }
  const userData = useSelector((state) => state.login.login.data.data.user);
  return (
    <form className="container_info_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Agregar dirección de envio</h3>
      <div className="new_adress">
        <label>Nueva dirección de envío: </label>
        <input type="text" id="direccion" />
      </div>
      <div className="btn_data_user">
        <div className="btn_enviar_adress" onClick={handleSubmit}>
          AGREGAR DIRECCIÓN
        </div>
      </div>
      <div className="btn_data_user">
        <Link to="/usuario/config/" className="btn_volver_user">
          VOLVER
        </Link>
      </div>
    </form>
  );
}
