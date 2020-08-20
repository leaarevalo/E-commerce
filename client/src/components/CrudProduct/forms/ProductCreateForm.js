import React  from "react";
import axios from "axios";
import { regNombre, regPrecio } from "./regex";
import { useSelector} from "react-redux";

//CSS
import "./ProductCreateForm.css";
//COMPONENTES
import ColorsCreate from "./ColorsCreate.js"

export default function FormCreate({ showCategoryOption }) {
  var errors = [];
  const arrayCategories = useSelector((state) => state.categories.categories);
  var colors = [];

  function setColor(color) {
   colors.push(color);
   }
  function showPopup(){
    document.getElementById('popup').style.display='block';
  };
  function closePopup(){
      document.getElementById('popup').style.display='none';
  };
  function handleSubmit(e) {
    e.preventDefault();
    var name = document.querySelector("#name").value;
    var description = document.querySelector("#description").value;
    var keywords = document.querySelector("#keywords").value;
    var price = document.querySelector("#price").value;
    var idCategory = document.querySelector("#category").value.id;
    var image = " ";
    var body = { name, description, price, keywords, idCategory, image, colors };
    console.log(body);
    axios({
      method: "POST",
      url: "http://localhost:3001/product/add",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      data: body,
    })
      .then(function (res) {
        console.log(res.data);
        alert("Se guardó el producto");
      })
      .catch((reason) => alert("No se pudo guardar " + reason));

  }

  function removeErrors(str) {
    errors = errors.filter((error) => !error.includes(str));
  }

  function handleInputChange(e) {
    var errorName = document.querySelector(".errorName");
    var errorDescription = document.querySelector(".errorDescription");
    var errorPrice = document.querySelector(".errorPrice");
    var errorKeywords = document.querySelector(".errorKeywords");
    let input = e.target;

    // Errores para el campo Name:
    if (input.name === "name") {
      // Si supera la longitud de 100 caracteres. ERROR!
      if (input.value.length > 5) {
        // 5 para probar
        errorName.innerHTML = "Demasiado largo. Máx: 100 caracteres";
        errors.push("nombreLargo");

        // Si está vacío
      } else if (input.value.length === 0) {
        errorName.innerHTML = "Campo obligatorio";
        errors.push("nombreVacio");

        // Si no cumple con la funcion Regex. ERROR!
      } else if (!regNombre.test(input.value)) {
        errorName.innerHTML = "No debe contener caracteres especiales";
        errors.push("nombreInvalido");

        // Sino, todo bien
      } else {
        errorName.innerHTML = "";
        removeErrors("nombre");
      }
    }

    // Errores para el campo Description:
    if (input.name === "description") {
      // Si supera la longitud de 300 caracteres. ERROR!
      if (input.value.length > 5) {
        // 5 para probar
        errorDescription.innerHTML = "Demasiado largo. Máx: 300 caracteres";
        errors.push("descripcionLargo");

        // Si está vacío
      } else if (input.value.length === 0) {
        errorDescription.innerHTML = "Campo obligatorio";
        errors.push("descripcionVacio");

        // Sino, todo bien
      } else {
        errorDescription.innerHTML = "";
        removeErrors("descripcion");
      }
    }

    // Errores para el campo Price:
    if (input.name === "price") {
      // Si supera la longitud de 100000 caracteres. ERROR!
      if (input.value.length > 5) {
        // 5 para probar
        errorPrice.innerHTML = "Demasiado largo. Máx: 100000 dígitos";
        errors.push("precioLargo");

        // Si está vacío
      } else if (input.value.length === 0) {
        errorPrice.innerHTML = "Campo obligatorio";
        errors.push("precioVacio");

        // Si no cumple con la funcion Regex. ERROR!
      } else if (!regPrecio.test(input.value)) {
        errorPrice.innerHTML =
          "No puede contener letras o caracteres especiales";
        errors.push("precioInvalido");

        // Sino, todo bien
      } else {
        errorPrice.innerHTML = "";
        removeErrors("precio");
      }
    }

    // Errores para el campo Keywords:
    if (input.name === "keywords") {
      // Si supera la longitud de 100 caracteres. ERROR!
      if (input.value.length > 15) {
        // 15 para probar
        errorKeywords.innerHTML = "Demasiado largo. Máx: 100 caracteres";
        errors.push("keywordsLargo");

        // Si está vacío
      } else if (input.value.length === 0) {
        errorKeywords.innerHTML = "Campo obligatorio";
        errors.push("keywordsVacio");

        // Si no cumple con la funcion Regex. ERROR!
      } else if (!regNombre.test(input.value)) {
        errorKeywords.innerHTML = "No debe contener caracteres especiales";
        errors.push("keywordsInvalido");

        // Sino, todo bien
      } else {
        errorKeywords.innerHTML = "";
        removeErrors("keywords");
      }
    }
  }

  return (
      <div className="bg_form">
        
        <div className="titulo_form">
          <h2>AGREGAR NUEVO PRODUCTO</h2>
        </div>

        <form className="crud_create_product_form" onSubmit={handleSubmit}>
          <div className="basic_data_product">
            {/*FORM LEFT*/}
            <div className="form_left">
              <div className="form_input_name">
                <label>Nombre:</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nombre del producto"
                  onChange={handleInputChange}
                />
                <p className="errorName danger"></p>
              </div>
              <div className="form_input_desc">
                <label>Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Descripción del producto"
                  className="product_description"
                  onChange={handleInputChange}
                />
                <p className="errorDescription danger"></p>
              </div>
              <div className="form_input_keywords">
                <label>Keywords:</label>
                <input
                  id="keywords"
                  type="text"
                  name="keywords"
                  placeholder="Etiquetas del producto"
                  onChange={handleInputChange}
                />
                <p className="errorKeywords danger"></p>
              </div>
            </div>

            {/*FORM RIGHT*/}
            <div className="form_right">
              <div className="form_input_price">
                <label>Precio: $</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  placeholder="Precio del producto"
                  onChange={handleInputChange}
                />
                <p className="errorPrice danger"></p>
              </div>

              <div className="form_select_category">
                <label>Categoría:</label>
                <select
                  id="category"
                  name="category"
                  className="select_cat"
                  onChange={(e) => e.target.value}
                >
                {showCategoryOption(arrayCategories)}
                </select>
              </div>
              <div className="colors_submit">
                <div onClick={ e => showPopup()} className="colors_btn">AGREGAR ATRIBUTO COLOR</div>
                <input  placeholder="Colores del producto"/>
              </div>
            </div>
          </div>
          
          {/*POPUP INVISIBLE COMPONENTE COLORES*/}           
          <div className="popup_color" id='popup'>
              <div onClick={e => closePopup()} className='close'><i className="far fa-times-circle"></i></div> 
              <ColorsCreate setColor={setColor} closePopup={closePopup}/>
          </div>
          
          <div className="formP_input_submit">
              <input className="btn_guardar_producto" type="submit" name="submit" value="GUARDAR PRODUCTO"/>
          </div>
          
        </form>
      </div>
  );
}
