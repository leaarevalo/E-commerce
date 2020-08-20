import React from 'react';

// CSS
import './ProductItem.css';

export default function ProductItem({category, deleteCategory, updateCategory}) {
    return (
      
    <div className='item_list-container'>
        <div className='item_list_name'>
            {category.name}
        </div>
        <div className="item_list_btns">
            <div onClick={e => updateCategory(category)} className='btn_modificar'><i  title='Modificar categoría' className="far fa-edit"></i></div>
            <div onClick={e => deleteCategory(category)} className='btn_eliminar'><i title='Eliminar categoría' className="fas fa-trash-alt"></i></div>
        </div>        
    </div>   
    );
}