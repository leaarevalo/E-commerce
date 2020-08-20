import React from 'react';
import {Link} from 'react-router-dom';
// CSS
import './ProductItem.css';

export default function ProductItem({product, deleteItem, updateItem}) {
    return (
      
    <div className='item_list-container'>
        <div className='item_list_name'>
            {product.name}
        </div>
        <div className='item_list_description'>
            {product.description}
        </div>
        <div className='item_list_price'>
            {'$ '+product.price}
        </div>
        <div className="item_list_btns">
            <Link to={'/producto/' + product.id} className='btn_ver'><i title='Ver producto' className="far fa-file"></i></Link>
            <div onClick={e => updateItem(product)} className='btn_modificar'><i  title='Modificar producto' className="far fa-edit"></i></div>
            <div onClick={e => deleteItem(product)} className='btn_eliminar'><i title='Eliminar producto' className="fas fa-trash-alt"></i></div>
        </div>        
    </div>   
    );
}