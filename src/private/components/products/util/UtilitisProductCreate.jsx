import React from 'react'
import './UtilitisProductCreate.css'

import { GrClone } from "react-icons/gr";
import { RiFileExcel2Line } from "react-icons/ri";
import { MdSwapVerticalCircle } from "react-icons/md";


function UtilitisProductCreate() {
  return (
    <>
      <div className='util-box d-flex-colum-evl disabled-content'>
        <div className="disabled"></div>
        <div className="util-func">
          <span>Duplicar um produto</span>
          <label htmlFor="id_product">ID Produto</label>
          <input type="number" id='id_product' />
          <button>
            <GrClone/>
          </button>
        </div>
        <div className="util-func">
          <span>Dados externos</span>
          <div className='ajt-width'>
            <p>Importar produto</p>
          </div>
          <button className='bt-excel'>
            <RiFileExcel2Line/>
          </button>
        </div>
      </div>
      <div className="util-box disabled-content">
      <div className="disabled"></div>
          <div className="custom-util">
            <span>Calculadora Logística</span>
            <div className="func-item custom-f_item">
              <p>Calcular preço frete</p>
              <button className='bt-calc'>
                <MdSwapVerticalCircle/>
              </button>
            </div>  
            <div className="func-item">
              <label htmlFor="d-price">Preço adequado</label>
              <input type="text" id='d-price' readOnly />
            </div>  
          </div>
      </div>
      <div className="util-box disabled-content">
      <div className="disabled"></div>
          <div className="custom-util-price">
            <span className='title'>Preço da concorrência</span>
            <div className="func-item">
              <label htmlFor="title-prod">Titulo do produto</label>
              <input type="text" id="title-prod" />
            </div>
            <div className="util-price-content">
              <div>
                <label htmlFor="min_price">Menor preço</label>
                <input type="text" id="min_price" />
              </div>
              <div>
                <label htmlFor="max_price">Maior preço</label>
                <input type="text" name="" id="max_price" />
              </div>
            </div>
          </div>
      </div>
    </>
  )
}

export default UtilitisProductCreate