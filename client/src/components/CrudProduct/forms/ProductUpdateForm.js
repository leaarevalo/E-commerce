import React from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";

//CSS
import './ProductUpdateForm.css';

export default function ProductUpdateForm({productSelected,showCategoryOption}){
  var errors = [];
  const regNombre = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
  const regPrecio = /^[0123456789]+$/u;
  const arrayCategories = useSelector((state) => state.categories.categories);

  function handleSubmit(e){
    e.preventDefault();
    var id = productSelected.id;
    var name = document.querySelector('#name').value;
    var description = document.querySelector('#description').value;
    var keywords = document.querySelector('#keywords').value;
    var price = document.querySelector('#price').value;
    var idCategory = 5;
    var body = {id, name, description, price, idCategory, keywords};
    // console.log(body);
    axios({
        method:'PUT',
        url:'http://localhost:3001/product/'+id,
        data:body
        })
        .then(function(res){
          console.log(res.data);
          alert("Se actualizó el producto");
        })
        .catch(reason => alert("No se pudo actualizar "+reason));
  };

  function removeErrors(str){
    errors = errors.filter(error => !error.includes(str));
  }

  function handleInputChange(e){
    var errorName = document.querySelector('.errorName');
    var errorDescription = document.querySelector('.errorDescription');
    var errorPrice = document.querySelector('.errorPrice');
    let input = e.target;
    
    // Errores para el campo Name:
    if(input.name === 'name'){

      // Si supera la longitud de 100 caracteres. ERROR!
      if(input.value.length > 25) { // 5 para probar
        errorName.innerHTML = 'Demasiado largo. Máx: 100 caracteres';
        errors.push('nombreLargo');       

        // Si está vacío
      } else if(input.value.length === 0){
        errorName.innerHTML = 'Campo obligatorio';
        errors.push('nombreVacio');

        // Si no cumple con la funcion Regex. ERROR!
      } else if(!regNombre.test(input.value)){
        errorName.innerHTML = 'No debe contener caracteres especiales';
        errors.push('nombreInvalido');

        // Sino, todo bien
      } else{
        errorName.innerHTML = '';
        removeErrors('nombre');
      }     
    }

    // Errores para el campo Description:
    if(input.name === 'description'){

      // Si supera la longitud de 300 caracteres. ERROR!
      if(input.value.length > 25) { // 5 para probar
        errorDescription.innerHTML = 'Demasiado largo. Máx: 300 caracteres';
        errors.push('descripcionLargo');       

        // Si está vacío
      } else if(input.value.length === 0){
        errorDescription.innerHTML = 'Campo obligatorio';
        errors.push('descripcionVacio');

      // Sino, todo bien
      } else{
        errorDescription.innerHTML = '';
        removeErrors('descripcion');
      }     
    }

    // Errores para el campo Price:
    if(input.name === 'price'){

      // Si supera la longitud de 100000 caracteres. ERROR!
      if(input.value.length > 25) { // 5 para probar
        errorPrice.innerHTML = 'Demasiado largo. Máx: 100000 dígitos';
        errors.push('precioLargo');       

        // Si está vacío
      } else if(input.value.length === 0){
        errorPrice.innerHTML = 'Campo obligatorio';
        errors.push('precioVacio');

        // Si no cumple con la funcion Regex. ERROR!
      } else if(!regPrecio.test(input.value)){
        errorPrice.innerHTML = 'No puede contener letras o caracteres especiales';
        errors.push('precioInvalido');

        // Sino, todo bien
      } else{
        errorPrice.innerHTML = '';
        removeErrors('precio');
      }     
    }
  }
   
  return (
    <div>
      <div className="container_form">
        <div className="titulo_form">
          <h1>Modificar producto</h1>
        </div>
        <form className="crud_update_product_form" onSubmit={handleSubmit}>
        <div className="form_left">
        <div className="form_input_name">
            <label>Nombre:</label>
            <input
              id='name'
              type="text" 
              name="name" 
              placeholder={productSelected.name}
              onChange={handleInputChange}
            />
            <p className="errorName danger"></p>
          </div>

          <div className="form_input_desc">
            <label>Descripción:</label>
            <textarea 
              id='description'
              name ="description" 
              placeholder={productSelected.description}          
              className = 'product_description'
              onChange = {handleInputChange} 
              />
              <p className="errorDescription danger"></p>
          </div>

          <div className="form_input_keywords">
            <label>Keywords:</label>
            <input 
              id='keywords'
              type="text" 
              name="keywords" 
              placeholder={productSelected.keywords}
              onChange={handleInputChange} 
            />
          </div>

          <div className="form_input_submit">
            <input type="submit" name="submit" value="Guardar cambios"/>
          </div>

        </div>    
        <div className="form_right">
        <div className="form_input_price">
            <label>Precio: $</label>
            <input 
              id='price'
              type="number" 
              name="price" 
              placeholder={productSelected.price}
              onChange={handleInputChange} 
            />
            <p className="errorPrice danger"></p>
          </div>

          <div className="form_input_category">
            <label>Categoría:</label>
            <select name="category" className='select_category' onChange= {e => (e.target.value)}> 
              {showCategoryOption(arrayCategories)}
            </select>
          </div>

        </div>           
  </form>
      </div>
    </div>
            
        )
  }
