import React from 'react';
// CSS
import './ReviewItem.css';
//COMPONENTES
import { FaStar } from "react-icons/fa";

//title  review  ranking  idUsuario   idProduct
export default function ReviewItem({rev}) {
    /*<div className="item_list_btns">
    <div onClick={e => updateItem(rev)} className='btn_modificar'><i  title='Modificar producto' className="far fa-edit"></i></div>
    <div onClick={e => deleteItem(rev)} className='btn_eliminar'><i title='Eliminar producto' className="fas fa-trash-alt"></i></div>
    </div> 
    */
   //traer usuarios y buscar el nombre
    return (
      
    <div className='item_list_rev_container'>
        <div className='item_list_ranking'>
        {[...Array(rev.ranking)].map((star, i) => {
          return (
            <label>
              <FaStar
                className="star"
                color={"#ffc107"}
                size={25}
              />
            </label>
          );
        })}
        </div>
        <div className='item_list_rev_title'>
            {rev.title}
        </div>
        <div className='item_list_rev'>
            {rev.review}
        </div>
          
    </div>   
    );
}