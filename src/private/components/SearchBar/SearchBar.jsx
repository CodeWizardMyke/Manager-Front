import React from 'react'
import './SearchBar.css';
import { RiFileSearchLine } from "react-icons/ri";

function SearchBar({
      query, setQuery, 
      searchBy, setSearchBy,
      filterBy, setFilterBy,
      sendRequest,optionSelect
    }) 
{
  const opt = optionSelect || [
    { value: "default", label: "default" },
  ];


  return (
    <div className="SearchBar">
      <div className="FieldsContainer">
        <div>
          <input type="text" placeholder='Buscar...' defaultValue={ query ? query : ""} onChange={e => setQuery(e.target.value)}/>
          <button 
            type='button'
            onClick={ sendRequest }
          ><RiFileSearchLine/></button>
        </div>
        <div>
          <select id="filter" defaultValue={searchBy ? searchBy : "title"} onChange={ e => setSearchBy(e.target.value) } >
            { 
              opt.map( (option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
          </select>
        </div>
      </div>
      <div className="FieldsContainer">
        <div>
          <input type="text" placeholder='Filtrar...' />
          <button><RiFileSearchLine/></button>
        </div>
        <div>
          <select name="filter" id="filter">
            { 
              opt.map( (option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
}

export default SearchBar