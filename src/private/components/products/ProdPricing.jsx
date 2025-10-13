import React, { useCallback, useEffect, useState } from 'react'

function ProdPricing({data}) {
  const [productCost, setProductCost] = useState('');
  const [feelsTaxes, setFeelsTaxes ] = useState('');
  const [discounts, setDiscounts] = useState('');
  const [profitMargin,setProfitMargin] = useState('');
  const [sellingPrice, setSellingPrice]= useState('');


  return (
    <div className="attributes_pricing">
      <div className="fd-group">
        <label htmlFor="product_cost">Preço de custo</label>
        <input 
          type="text" 
          id='product_cost' 
          name='product_cost' 
          className='text_align-end' 
          defaultValue={ data ? data.profit_margin : productCost }
        />
      </div>

      <div className="fd-group">
        <label htmlFor="fees_and_taxes">Taxas/impostos %</label>
        <input type="text" id='fees_and_taxes' name='fees_and_taxes' defaultValue={ data ? data.fees_and_taxes : 0 } className='text_align-center' onChange={(e) => setFeelsTaxes(e.target.value)}  />
      </div>
      
      <div className="fd-group">
        <label htmlFor="profit_margin">Margem/Lucro %</label>
        <input type="text" id='profit_margin' name='profit_margin' defaultValue={ data ? data.profit_margin : 0 } className='text_align-center' onChange={(e) => setProfitMargin(e.target.value)} />
      </div>
      <div className="fd-group ">
        <label htmlFor="discounts">Descontos %</label>
        <input type="text" id='discounts' name='discounts' defaultValue={ data ? data.discounts : 0 } className='text_align-center' onChange={(e) => setDiscounts(e.target.value)}/>
      </div>
      <div className="fd-group ">
        <label htmlFor="stock">Estoque</label>
        <input type="text" id='stock' name='stock' defaultValue={ data ? data.stock : 0 }  className='text_align-center'/>
      </div>
      <div className="fd-group text_align">
        <label htmlFor="currency">Moeda</label>
        <select name="currency" id="currency" className='text_align-center'>
          <option value="BRL">Real</option>
        </select>
      </div>
      <div className="fd-group">
        <label htmlFor="selling_price">Preço de venda</label>
        <input 
          type="text" 
          id="selling_price" 
          name="selling_price" 
          className="text_align-end" 
          value={sellingPrice} 
          readOnly 
        />
      </div>
    </div>
  )
}

export default ProdPricing