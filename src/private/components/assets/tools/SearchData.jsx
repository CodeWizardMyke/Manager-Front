import React, { useEffect, useState } from 'react';
import { MdOutlineContentPasteSearch } from "react-icons/md";
import ToolsConfig from './ToolsConfig';

function SearchData({searchConfig, setQuerySearch, searchFunction}) {
  const search = searchConfig ? searchConfig : ToolsConfig.searchConfigDefault;
 
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('');

  useEffect(()=> {
    setQuerySearch({query,searchType})
  },[query,searchType,setQuerySearch])

  return (
    <div className="util-box">
        <div className="util-func">
          <label htmlFor="search">Campo de busca</label>
          <input type="text" name="search" id="search" onChange={(e) => setQuery(e.target.value)}/>  
          <button className='bt-primary' onClick={searchFunction} >
            <MdOutlineContentPasteSearch/>
          </button>
        </div>  
        <div className='util-func'>
          <label htmlFor="search_by">Forma de busca</label>
          <select name="search_by" id="search_by" onChange={(e) => {setSearchType(e.target.value)}}>
            {
            search.options.map((item,index) => (
                <option key={index+item.value} value={item.value}>{item.txt}</option>
              )) 
            }
          </select>
        </div>
    </div>
  )
}

export default SearchData