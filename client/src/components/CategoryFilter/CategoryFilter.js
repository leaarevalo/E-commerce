import React, {useState} from 'react';
import { useSelector } from "react-redux";
// CSS
import './CategoryFilter.css';


export default function CategoryFilter({onFilter, showCategoryOption}){
  //estado local de la categoria seleccionada para realizar el filtro
  var [category, setCategory] = useState ('');
  const arrayCategories = useSelector((state) => state.categories.categories);
  return(
    <div className="form_category">
      <select
        className="select_category"
        onChange={(e) => setCategory(e.target.value)}
        >
        {showCategoryOption(arrayCategories)}
      </select>
      <button className="filter_btn" onClick={e => onFilter(category)}>Filtrar</button>
  </div>
 );
}
