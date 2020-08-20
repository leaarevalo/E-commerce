import React, {useState} from 'react';
// CSS
import './SearchBar.css';


export default function SearchBar({onSearch}){
  var [keyword, setKeyword] = useState("");  
  return(
        <form className="form_search" 
            onSubmit={(e) => {
            e.preventDefault();
            onSearch(keyword);
            setKeyword("");
          }}>
            <input
              className="search_bar"
              type="search"
              placeholder="Buscar Productos"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            />
            <input type="submit" value="Buscar" className="search_btn"/>
          </form>
        );
}
