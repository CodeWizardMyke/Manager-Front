import React from 'react'
import { VscFilePdf } from "react-icons/vsc";
import { RiFileExcel2Line } from "react-icons/ri";

function DownloadData() {
  return (
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
  )
}

export default DownloadData