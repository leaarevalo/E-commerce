import React from "react";
import { Route } from "react-router-dom";

// Componentes
import Product from "./components/Product/Product.js";
import Catalogo from "./components/Catalogo/Catalogo.js";
import CrudProduct from "./components/CrudProduct/CrudProduct.js";
import FormCreateUsuario from "./components/CrudUsuario/FormCreateUsuario.js";
import Carrito from "./components/Carrito/Carrito.js";
import FormLoginUsuario from "./components/CrudUsuario/FormLoginUsuario.js";
import FormConfigUsuario from "./components/CrudUsuario/FormConfigUsuario.js";
import DatosUsuario from "./components/CrudUsuario/DatosUsuario.js";
import CambiarContraseña from "./components/CrudUsuario/CambiarContraseña.js";
import ShipAdress from "./components/CrudUsuario/ShipAdress.js";
import MyOrders from "./components/CrudUsuario/MyOrders.js";
import MyReviews from "./components/CrudUsuario/MyReviews.js";

export default function App() {
  return (
    <div className="App">
      {/* PRODUCT Routes */}
      <Route exact path="/" component={() => <Catalogo />} />
      <Route
        exact
        path="/producto/:id"
        component={({ match }) => <Product id={match.params.id} />}
      />

      {/* ADMIN Routes */}
      <Route
        exact
        path="/panel-admin/producto/"
        component={() => <CrudProduct />}
      />
      {/* CRUD USUARIO Routes*/}
      <Route
        exact
        path="/usuario/registrarse/"
        component={() => <FormCreateUsuario />}
      />
      <Route
        exact
        path="/usuario/login/"
        component={() => <FormLoginUsuario />}
      />
      <Route
        exact
        path="/usuario/config/"
        component={() => <FormConfigUsuario />}
      />
      <Route exact path="/usuario/cart/" component={() => <Carrito />} />
      <Route exact path="/usuario/datos" component={() => <DatosUsuario />} />
      <Route exact path="/usuario/new_password" component={() => <CambiarContraseña />} />
      <Route exact path="/usuario/ship_adress" component={() => <ShipAdress />} />
      <Route exact path="/usuario/orders" component={() => <MyOrders />} />
      <Route exact path="/usuario/reviews" component={() => <MyReviews />} />
      
     

    </div>
  );
}
