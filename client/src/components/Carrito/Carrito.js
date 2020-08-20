import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

// CSS
import "./Carrito.css";
//COMPONENTES
import ProductItemCart from "./ProductItemCart.js";
import NavBar from "../NavBar/NavBar.js";
import { clearCart } from "../Redux/actions/cartAction.js";

export default function Carrito() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart);
  const login = useSelector((state) => state.login.login);
  const [isLogin, setLogin] = useState();
  const [checkoutIsLogin, setcheckoutIsLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({});
  useEffect(() => {
    if (!isLogin) {
      verifyLogin(login);
    }
  }, []);

  var subTotal = 0;
  let arrayProductosCart = items;

  //VERIFICA EL LOGIN
  function verifyLogin(login) {
    if (login.data !== undefined) {
      let body = {
        token: login.data.data.token,
      };
      axios({
        method: "POST",
        url: "http://localhost:3001/user/me",
        data: body,
      })
        .then(function () {
          setLogin(true);
          setUserLogin({
            userId: login.data.data.user.id,
            token: login.data.data.token,
          });
        })
        .catch(function (reason) {
          // alert("El usuario no esta logueado");
          console.log(reason);
        });
    }
  }
  //MUESTRA LOS PRODUCTOS AGREGADOS AL CARRITO O MUESTRA "CARRITO VACIO"
  function showProducts(arrayProductosCart) {
    if (arrayProductosCart.length > 0) {
      subTotalItems(arrayProductosCart);
      return arrayProductosCart.map((product) => (
        <ProductItemCart product={product} subTotal={subTotal} />
      ));
    } else {
      return <div className="empty_cart">TU CARRITO ESTA VACÍO.</div>;
    }
  }
  //CALCULA EL MONTO TOTAL DE LA COMPRA
  function subTotalItems(arrayProductosCart, product) {
    if (arrayProductosCart !== undefined) {
      arrayProductosCart.forEach((element) => {
        subTotal += element.count * element.price;
      });
    } else {
      subTotal = product.price;
    }
  }
  //CHECKOUT -> CREA LA ORDEN -> VACIA EL CARRITO -> ENVIA MAIL DE CONFIRMACION
  function generateOrder() {
    if (isLogin) {
      var f = new Date();
      var fecha =
        f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
      const body = { fecha, userId: userLogin.userId, token: userLogin.token };
      axios({
        method: "POST",
        url: `http://localhost:3001/orden/add`,
        data: body,
      })
        .then(function (res) {
          items.forEach((item) => {
            const bodyLinea = {
              cantidad: item.count,
              price: item.price * item.count,
              ordenId: res.data.id,
              stockXColorId: item.stockXColorId,
            };
            axios({
              method: "POST",
              url: `http://localhost:3001/lineaDeOrden/add`, //FALTA CREAR ESTA RUTA!!!!!!!!!
              data: bodyLinea,
            })
              .then(function (res) {
                console.log("Se realizó la compra"); //no funcionaaaaaaa
              })
              .catch((reason) => {
                console.log("No se pudo crear la orden " + reason);
              });
          });
        })
        .then(function (res) {
          alert("Se realizó la compra");
          checkOut(dispatch);
        })
        .catch((reason) => console.log("No se pudo crear la orden " + reason));
    } else {
      setcheckoutIsLogin(true);
    }
  }

  /*
      items.forEach(item => {
          const body = { token:userLogin.token, userId:userLogin.userId, fecha, cantidad:item.count, price: item.price * item.count, stockXColorId: item.stockXColorId  };
          axios({
              method: "POST",
              url: `http://localhost:3001/orden/add`,
              data: body,
              })
              .then(function (res) {
                console.log(res.data);
                alert("Se concreto la compra")
              })
              .catch((reason) =>
                console.log("No se pudo crear la orden " + reason)
              ); 
      });
      */
  //ACA HAY QUE VACIAR EL CARRITO!!!!
  //ENVIAR MAIL CONFIRMANDO LA COMPRA
  //ENVIAR MAIL DE ORDEN DESPACHADA

  //SI EL USUARIO HACE EL CHECKOUT SIN ESTAR LOGUEADO LO REDIRECCIONA A LA RUTA DE LOGIN
  if (checkoutIsLogin) {
    return <Redirect to="/usuario/login/" />;
  }
  return (
    <div className="container_add_user">
      <NavBar />
      <div className="catalogo_bg"></div>
      <h3>Carrito de compras</h3>
      <div className="container_cart">
        <div className="products">
          <div className="cart_head">
            <h5 className="head_1">PRODUCTO</h5>
            <h5 className="head_2">DESCRIPCION</h5>
            <h5 className="head_3">COLOR</h5>
            <h5 className="head_4">PRECIO</h5>
            <h5 className="head_5">CANTIDAD</h5>
          </div>
          <div className="productos">{showProducts(arrayProductosCart)}</div>
        </div>

        <div className="finish">
          <div className="total">TOTAL: {" $  " + subTotal}</div>
          <button className="comprar" onClick={(e) => generateOrder()}>
            FINALIZAR COMPRA
          </button>
        </div>
      </div>
    </div>
  );
}

function checkOut(dispatch) {
  let checkOutCart = dispatch(clearCart());
  return checkOutCart;
}
