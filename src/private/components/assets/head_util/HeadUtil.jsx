import React from 'react'

import { MdOutlineContentPasteSearch } from "react-icons/md";
import { IoMdColorFilter } from "react-icons/io";
import { RiFileExcel2Line } from "react-icons/ri";
import { VscFilePdf } from "react-icons/vsc";

function HeadUtil({configHeadUtil, setQuery ,setSearchBy, sendRequest}) {
  let config = configHeadUtil ? configHeadUtil : {search:{options:[{value:'id',txt:'id'},],}, filter:{options:[{value:'id',txt:'id'},],},}
  const {search, filter} = config;

  return (
    <>
      <div className="util-box">
        <div className="util-func">
          <label htmlFor="search">Campo de busca</label>
          <input type="text" name="search" id="search" onChange={(e) => setQuery(e.target.value)}/>  
          <button className='bt-primary' onClick={sendRequest}>
            <MdOutlineContentPasteSearch/>
          </button>
        </div>  
        <div className='util-func'>
          <label htmlFor="search_by">Forma de busca</label>
          <select name="search_by" id="search_by" onChange={(e) => {setSearchBy(e.target.value)}}>
            {
             search.options.map((item,index) => (
                <option key={index+item.value} value={item.value}>{item.txt}</option>
              )) 
            }
          </select>
        </div>
      </div>

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
            {
              filter.options.map((item,index) => (
                <option key={index+item.value} value={item.value}>{item.txt}</option>
              )) 
            }
          </select>
        </div>
      </div>

      <div className="util-box disabled-content">
      <div className="disabled"></div>
        <div className="util-func">
          <p htmlFor="search">Baixar Excel</p>
          <button className='bt-excel'>
            <RiFileExcel2Line/>
          </button>
        </div>  
        <div className='util-func'>
          <p htmlFor="search_by">Baixar PDF</p>
          <button className='bt-pdf'>
            <VscFilePdf/>
          </button>
        </div>
      </div>
    </>
  )
}

export default HeadUtil