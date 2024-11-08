import React, { useCallback, useEffect, useState } from 'react'
import { useContext } from 'react';
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdPricing() {
  const {unformatPrice} = useContext(ProductCreateContext);
  const [productCost, setProductCost] = useState('');
  const [feelsTaxes, setFeelsTaxes ] = useState('');
  const [discounts, setDiscounts] = useState('');
  const [profitMargin,setProfitMargin] = useState('');
  const [sellingPrice, setSellingPrice]= useState('');

  const formatingPrice = (e) => {
    let value = e.target.value;

    // Remove qualquer caractere não numérico
    value = value.replace(/\D/g, '');

    // Formata o valor para moeda BRL adicionando duas casas decimais
    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(value / 100);

    return formattedPrice;
  };

  const productCoastHanddler = (e) => {
    let value = formatingPrice(e);
    setProductCost(value);
  };

  const sellingPriceHandle = useCallback(() => {
    let coastProduct = unformatPrice(productCost);
    let appliProfitMargin = (coastProduct + (coastProduct * (profitMargin / 100))).toFixed(2);
    let appliFeelsTaxes = (appliProfitMargin - (appliProfitMargin * (feelsTaxes / 100))).toFixed(2);
    let appliDiscounts = (appliFeelsTaxes - (appliFeelsTaxes * (discounts / 100))).toFixed(2);

    setSellingPrice(appliDiscounts);
  }, [productCost, feelsTaxes, discounts, profitMargin, unformatPrice]);

  useEffect(() => {
    if (productCost !== '' || feelsTaxes > 0 || discounts > 0 || profitMargin > 0) {
      sellingPriceHandle();
    }
  }, [productCost, feelsTaxes, discounts, profitMargin, sellingPriceHandle]);

  return (
    <div className="attributes_pricing">
      <div className="fd-group">
        <label htmlFor="product_cost">Preço de custo</label>
        <input 
          type="text" 
          id='product_cost' 
          name='product_cost' 
          className='text_align-end' 
          value={productCost}
          onChange={productCoastHanddler} 
        />
      </div>

      <div className="fd-group">
        <label htmlFor="fees_and_taxes">Taxas/impostos %</label>
        <input type="text" id='fees_and_taxes' name='fees_and_taxes' className='text_align-center' onChange={(e) => setFeelsTaxes(e.target.value)}  />
      </div>
      
      <div className="fd-group">
        <label htmlFor="profit_margin">Margem/Lucro %</label>
        <input type="text" id='profit_margin' name='profit_margin' className='text_align-center' onChange={(e) => setProfitMargin(e.target.value)} />
      </div>
      <div className="fd-group ">
        <label htmlFor="discounts">Descontos %</label>
        <input type="text" id='discounts' name='discounts' className='text_align-center' onChange={(e) => setDiscounts(e.target.value)}/>
      </div>
      <div className="fd-group ">
        <label htmlFor="stock">Estoque</label>
        <input type="text" id='stock' name='stock' className='text_align-center'/>
      </div>
      <div className="fd-group text_align">
        <label htmlFor="currency_id">Moeda</label>
        <select name="currency_id" id="currency_id" className='text_align-center'>
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