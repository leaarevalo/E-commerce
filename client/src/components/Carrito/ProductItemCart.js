import React, { useState } from "react";
import { Link } from "react-router-dom";
// CSS
import "./ProductItemCart.css";
import { clearProduct, increaseQuantity } from "../Redux/actions/cartAction.js";
import { useDispatch } from "react-redux";

export default function ProductItemCart({ product }) {
  const dispatch = useDispatch();

  var [subtotal, setSubtotal] = useState(0);

  function subtotalItem(cant) {
    dispatch(increaseQuantity({ cant, product }));
    setSubtotal(product.count * product.price);
  }

  return (
    <div className="item_list_container">
      <Link to={"/producto/" + product.id} className="item_cart_name">
        {product.name}
      </Link>
      <div className="item_cart_description">{product.description}</div>
      <div type="text" className="item_color"> {product.selectedColor} </div>
      <div className="item_cart_price" name="precio">
        {"$ " + product.price}
      </div>
      <input
        type="number"
        min="1"
        name="cantidad"
        onChange={(e) => subtotalItem(e.target.value)}
        className="item_cant"
        value={product.count}>
        </input>
      
      <div className="item_cart_btns">
        <div className="btn_eliminar">
          <i
            onClick={() => dispatch(clearProduct(product))}
            title="Eliminar producto"
            className="fas fa-trash-alt"
          ></i>
        </div>
      </div>
    </div>
  );
}
