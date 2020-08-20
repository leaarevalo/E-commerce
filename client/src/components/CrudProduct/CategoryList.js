import React from 'react';
import { useSelector } from "react-redux";

// CSS
import './CategoryList.css';
// Components
import CategoryItem from './CategoryItem.js';

export default function ProductsList({deleteCategory, updateCategory}){
  const arrayCategories = useSelector((state) => state.categories.categories);

  //muestra una lista de todos los productos (ver/modifica/borrar)
  function showCategories(arrayCategories){
    if(arrayCategories){
      return arrayCategories.map( category => <CategoryItem category={category} deleteCategory={deleteCategory} updateCategory={updateCategory}/> );
    }
  }; 

  return(
      <div className="crud_category_list">
          <div className="crud_category_header">
              <h2>LISTADO DE CATEGORIAS</h2>
          </div>
          <div className="category_list">
              {showCategories(arrayCategories)}
          </div>
          

      </div>
  )
}