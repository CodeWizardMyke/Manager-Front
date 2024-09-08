import React from 'react'
import { IoMdColorFilter } from "react-icons/io";

function FilterData() {

  return (
    <div className="util-box disabled-content">
      <div className="disabled"></div>
      <div className="util-func">
        <label htmlFor="search">Campo de Filtro</label>
        <input type="text" name="search" id="search" />  
        <button className='bt-filter'>
          <IoMdColorFilter/>
        </button>
      </div>  
      <div className='util-func'>
        <label htmlFor="search_by">Filtrar por </label>
        <select name="search_by" id="search_by">
        </select>
      </div>
    </div>
  )
}

export default FilterData