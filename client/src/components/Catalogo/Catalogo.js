import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  setProductsSuccess,
} from "../Redux/actions/productsAction.js";
import { getCategories } from "../Redux/actions/categoryAction";

// CSS
import "./Catalogo.css";

// Components
import CategoryFilter from "../CategoryFilter/CategoryFilter.js";
import SearchBar from "../SearchBar/SearchBar.js";
import NavBar from "../NavBar/NavBar.js";
import ProductCard from "./ProductCard.js";

export default function Catalogo() {
  const dispatch = useDispatch();
  const arrayProductos = useSelector((state) => state.products.products);
  // const arrayCategories = useSelector((state) => state.categories.categories);
  useEffect(() => dispatch(getProducts()), []);
  useEffect(() => dispatch(getCategories()), []);

  //MUESTRA TODOS LOS PRODUCTOS
  function showProducts(arrayProductos) {
    return arrayProductos.map((product) => (
      <Link to={"/producto/" + product.id} className="catalogo_product">
        <ProductCard className="card" product={product} />
      </Link>
    ));
  }
  //DEVUELVE LOS PRODUCTOS QUE CUMPLEN CON LA BUSQUEDA
  function onSearch(keyword) {
    console.log(keyword);
    if (keyword) {
      var arraySearched = arrayProductos.filter(
        (product) =>
          product.name.toLowerCase().includes(keyword.toLowerCase()) ||
          product.keywords.toLowerCase().includes(keyword.toLowerCase())
      );
      dispatch(setProductsSuccess(arraySearched));
    } else {
      alert("No se han encontrado productos");
    }
  }
  //MUESTRA EN EL SELECT EL LISTADO DE LAS CATEGORIAS EXISTENTES
  function showCategoryOption(arrayCategories) {
    if (arrayCategories) {
      return arrayCategories.map((category) => (
        <option value={category.id} className="product_category_option">
          {category.name}
        </option>
      ));
    }
  }
  //FILTRA LOS PRODUCTOS POR CATEGORIA
  function onFilter(category) {
    if (category) {
      var arrayFiltered = arrayProductos.filter(
        (product) => product.idCategory === parseInt(category)
      );
      if (arrayFiltered) {
        dispatch(setProductsSuccess(arrayFiltered));
      } else {
        alert("No se encontraron productos para esa categoría");
      }
    } else {
      alert("No se encontraron productos para esa categoría");
    }
  }
  return (
    <div className="catalogo">
      <NavBar />
      <div className="catalogo_bg"></div>

      <div className="catalogo_title">
        <h1>Shop Online</h1>
        <h5>
          En nuestra tienda vas a encontrar accesorios de diseño exclusivo,
          confeccionados a mano con una visión que conjuga moda, belleza y
          pasión.
        </h5>
      </div>

      <div className="catalogo_bar">
        <div
          className="volver_catalogo_bar"
          onClick={(e) => dispatch(getProducts())}
        >
          Volver al listado completo
        </div>
        <CategoryFilter
          onFilter={onFilter}
          showProducts={showProducts}
          showCategoryOption={showCategoryOption}
        />
        <SearchBar showProducts={showProducts} onSearch={onSearch} />
      </div>

      <div className="container">
        <div className="catalogo_products">{showProducts(arrayProductos)}</div>
      </div>
    </div>
  );
}
