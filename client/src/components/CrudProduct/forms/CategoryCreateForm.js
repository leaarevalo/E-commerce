import React from 'react';
import axios from 'axios';

// CSS
import './CategoryCreateForm.css';

export default function CategoryCreateForm(){
    function handleSubmit(e){
        e.preventDefault();
        var name = document.querySelector('#name').value;
        var body = {name};
        // console.log(body);
        axios({
            method:'POST',
            url:'http://localhost:3001/category/add',
            data:body
            })
            .then(function(res){
              console.log(res.data);
              alert("Se guardó la categoría");
            })
            .catch(reason => alert("No se pudo guardar "+reason));
      };
    return (
            <form onSubmit={handleSubmit} className="form_category_create">
                 <div className="form_category_header">
                    <h2>CREAR NUEVA CATEGORIA</h2>
                </div>
                <div className="form_category_inputs">
                    <div className="formC_input_name">
                        <label>Nombre:</label>
                        <input
                        id='name'
                        type="text" 
                        name="name" 
                        placeholder="Nombre de la categoría"
                        />
                        <p className="errorName danger"></p>
                    </div>
                    <div className="formC_input_submit">
                        <input  className="btn_guardar_category" type="submit" name="submit" value="AGREGAR CATEGORÍA"/>
                    </div>
                </div>
                
            </form> 
    )
}