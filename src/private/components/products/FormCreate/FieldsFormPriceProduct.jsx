import React from 'react'
import './FieldsFormPriceProduct.css'

function FieldsFormPriceProduct() {

  return (
    <>
      <div className="wrapper-pricing">  
        <div className="form-group w-10">
          <label htmlFor="currency_id">Moeda:</label>
          <select name="currency_id" id="currency_id" >
            <option value="BRL">BRL</option>
            <option value="USD">USD</option>
          </select>
          <div className="error errors-currency_id"></div>
        </div>

        <div className="form-group w-10">
        <label htmlFor="price">Preço:</label>
          <input type="text" id="price"  name="price"/>
          <div className="error errors-price"></div>
        </div>

        <div className="form-group w-10">
          <label htmlFor="promotions">Descontos: %</label>
            <input type="number" id="promotions" name="promotions" />
          <div className="error errors-promotions"></div>
        </div>

        <div className="form-group w-10">
          <label htmlFor="stock">Estoque:</label>
          <input type="number" id="stock" className='align-center' name="stock" min={1} />
          <div className="error errors-stock"></div>
        </div>
      </div>
    </>
  )
}

export default FieldsFormPriceProduct