import React, { useState, useEffect } from 'react';
import './ProdPrice.css';

import {
  applyPercentagesDecreases,
  applyPercentagesIncreases,
  formatPrice,
} from './PricingProduct';
import InputGroupPrice from './InputGroupPrice';

function ProdPrice({DataContent, clearFields = null, setClearFields}) {

  const [pCost, setPCost] = useState(DataContent ? DataContent.product_cost : '');
  const [pFees, setPFees] = useState(DataContent ? DataContent.fees_and_taxes : '');
  const [pMargin, setPMargin] = useState(DataContent ? DataContent.profit_margin : '');
  const [pDiscount, setPDiscount] = useState(DataContent ? DataContent.discounts : '');
  const [pStock, setPStock] = useState(DataContent ? DataContent.stock : '');
  const [finalPrice, setFinalPrice] = useState(DataContent ? DataContent.selling_price : 0);
  
// Valores intermediários (em tempo real)
const feesValue = applyPercentagesIncreases(pCost, pFees);
const marginValue = applyPercentagesIncreases(feesValue, pMargin);
const discountValue = applyPercentagesDecreases(marginValue, pDiscount);

useEffect(() => {
  if(discountValue > 0){
    setFinalPrice(discountValue);
  }else{
    setFinalPrice(pCost)
  }

}, [pCost, pFees, pMargin, pDiscount, discountValue]);

   useEffect(() => {
      if(clearFields && clearFields !== null){
        setPCost('');
        setPFees('');
        setPMargin('');
        setPDiscount('');
        setPStock('');
        setFinalPrice(0);
        setClearFields(false);
      }
    }, [clearFields,setClearFields]);
return (
  <div className="ProdPrice">
    <div className="price-inputs">
      {/* PREÇO DE CUSTO */}
      <InputGroupPrice
        textLabel="Preço de custo:"
        data={pCost}
        setData={setPCost}
        inputName="product_cost"
        formatedData={formatPrice(pCost)}
      />

      {/* TAXAS / IMPOSTOS */}
      <InputGroupPrice
        textLabel="Taxas / Impostos (%):"
        data={pFees}
        setData={setPFees}
        inputName="fees_and_taxes"
        formatedData={formatPrice(feesValue)}
      />

      {/* MARGEM DE LUCRO */}
      <InputGroupPrice
        textLabel="Margem / Lucro (%):"
        data={pMargin}
        setData={setPMargin}
        inputName="profit_margin"
        formatedData={formatPrice(marginValue)}
      />

      {/* DESCONTO */}
      <InputGroupPrice
        textLabel="Descontos (%):"
        data={pDiscount}
        setData={setPDiscount}
        inputName="discounts"
        formatedData={formatPrice(discountValue)}
      />

      {/* MOEDA */}
      <div className="input-group">
        <label htmlFor="currency">Moeda</label>
        <select
          name="currency"
          id="currency"
          className="text_align-center"
          defaultValue={DataContent ? DataContent.currency : 'BRL'}
        >
          <option value="BRL">Real (BRL)</option>
        </select>
        <div className="formated-value">
          <span>Valor definido</span>
          <input type="text" disabled placeholder="BRL" />
        </div>
      </div>

      {/* ESTOQUE */}
      <InputGroupPrice
        textLabel="Estoque:"
        data={pStock}
        setData={setPStock}
        inputName="stock"
        formatedData={pStock}
      />

      {/* PREÇO FINAL */}
      <InputGroupPrice
        textLabel="Preço Final:"
        data={finalPrice}
        inputName="selling_price"
        formatedData={formatPrice(finalPrice)}
      />
    </div>
  </div>
);
}

export default ProdPrice;
