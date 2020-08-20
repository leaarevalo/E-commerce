import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/actions/productsAction.js";
import { logoutUser } from "../Redux/actions/userAction.js";

import axios from "axios";

//CSS
import "./NavBar.css";

//BARRA DE NAVEGACION DEL SITIO
function NavBar() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.login.login);
  const [isLogin, setLogin] = useState();

  useEffect(() => {
    if (!isLogin) {
      verifyLogin(login);
    }
  }, []);

  function userLogout() {
    dispatch(logoutUser());
    setLogin(false);
  }
  //VERIFICA EL LOGIN

  function verifyLogin(login) {
    if (login.data === undefined) {
      // setLogin(false);
    } else {
      var body = {
        token: login.data.data.token,
      };
      axios({
        method: "POST",
        url: "http://localhost:3001/user/me",
        data: body,
      })
        .then(function () {
          setLogin(true);
        })
        .catch(function (reason) {
          alert("El usuario no esta logueado");
          console.log(reason);
        });
    }
  }
  function algo() {
    if (isLogin) {
      return (
        <div className="user_bar">
          <Link to="/usuario/config" className="login">
            <span> {login.data.data.user.name} </span>
          </Link>
          <Link to="/" className="register" onClick={() => userLogout()}>
            <span> Logout </span>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="user_bar">
          <Link to="/usuario/login" className="login">
            <span> Login </span>
          </Link>
          <Link to="/usuario/registrarse" className="register">
            <span> Registrarse </span>
          </Link>
        </div>
      );
    }
  }
  return (
    <div className="bar">
      <div className="nav_bar">
        <Link
          to="/"
          onClick={() => dispatch(getProducts())}
          className="bar_home"
        >
          <span> Home </span>
        </Link>
        <Link
          to="/"
          onClick={() => dispatch(getProducts())}
          className="bar_shop"
        >
          <span> Shop </span>
        </Link>
      </div>
      <div className="user_bar">
        {algo()}
        <Link to="/usuario/cart" className="cart">
          <span>
            <i className="fas fa-shopping-cart"></i>{" "}
          </span>
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
