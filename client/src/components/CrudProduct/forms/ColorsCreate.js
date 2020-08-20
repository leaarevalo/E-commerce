import React from "react";

//CSS
//import "./ProductCreateForm.css";
import "./ColorsCreate.css"

export default function ColorsCreate({setColor, closePopup}) {
  function clearPopup(){
    document.querySelector("#name_color").value = '';
    document.querySelector("#color").value = '' ;
    document.querySelector("#amount").value = '';
    document.querySelector("#image_color").value = '';
    document.querySelector("#main").checked = false;
  }
  function colorSubmit(e){
    e.preventDefault();
    var name = document.querySelector("#name_color").value;
    var hexaColor = document.querySelector("#color").value;
    var cantidad = document.querySelector("#amount").value;
    var img = document.querySelector("#image_color").value;
    var main = document.querySelector("#main").checked;
  
    var image = img.split(/(\\|\/)/g).pop();
    
    var color = { name, hexaColor, stockXColor: {cantidad,image,main} };
    console.log(color);
    setColor(color);
    closePopup();
    clearPopup();
  }
  return (
    <div className="crud_create_color_form" >
      <div className='title_colors'>Variante color del producto</div>
      <div className="inputs_colors">
        <div className="input_color_name">
          <label>Nombre:</label>
          <input
            id="name_color"
            type="text"
            name="name"
            placeholder="Nombre del color"
          />
        </div>

        <div className="input_color_hexa">
          <label>Color:</label>
          <input
            id="color"
            name="description"
            type="color"
          />
        </div>

        <div className="input_color_cant">
          <label>Cantidad:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min="0"
          />
        </div>
      
        <div className="input_color_img">
            <label>Imagen:</label>
            <input 
              id="image_color" 
              type="file" 
              name="image" 
              accept="image/png, image/jpeg"
            />
        </div>
        <div className="input_color_main">
            <label>Imagen principal:</label>
            <input 
              type="checkbox" 
              id='main'
              className="main"
            />
        </div>
      </div>
      <div className="container_btn_color">
          <div type="submit" className="btn_color" onClick={colorSubmit}>GUARDAR DATOS DEL COLOR</div> 
      </div>
      
    </div>
        
    );
}
