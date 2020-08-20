import React, {useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../Redux/actions/productsAction.js";


// CSS
import './ProductsList.css';
// Components
import ProductItem from './ProductItem.js';

export default function ProductsList({deleteItem, updateItem}){
  const dispatch = useDispatch();
  const arrayProductos = useSelector((state) => state.products.products);
  useEffect(() => dispatch(getProducts()), []);
  
  //muestra una lista de todos los productos (ver/modifica/borrar)
  function showProducts(arrayProductos){
    if(arrayProductos){
      return arrayProductos.map( product => <ProductItem product={product} deleteItem={deleteItem} updateItem={updateItem}/> );
    };
  }; 

  return(
      <div className="crud_products_list">
          <div className="crud_products_header">
              <h2>LISTADO DE PRODUCTOS</h2>
          </div>
          <div className="products_list">
              {showProducts(arrayProductos)}
          </div>
          

      </div>
  )
}