import React from 'react';
import axios from 'axios';
import './ProductUpdateForm.css';

export default function CategoryUpdateForm({categorySelected}){
    function handleSubmit(e){
        e.preventDefault();
        var id = categorySelected.id;
        var name = document.querySelector('#name').value;
        var body = {id, name};
        axios({
            method:'PUT',
            url:'http://localhost:3001/category/modify',
            data:body
            })
            .then(function(res){
              console.log(res.data);
              alert("Se actualizó la categoría");
            })
            .catch(reason => alert("No se pudo actualizar "+reason));
    }

    return(
        <form className="crud_update_product_form" onSubmit={handleSubmit}>
            <div className="form_input_name">
                <label>Nombre:</label>
                <input
                id='name'
                type="text" 
                name="name" 
                placeholder={categorySelected.name}
                />
                <p className="errorName danger"></p>
            </div>
            <div className="form_input_submit">
                <input type="submit" name="submit" value="Guardar cambios"/>
            </div>
        </form>
    )
}