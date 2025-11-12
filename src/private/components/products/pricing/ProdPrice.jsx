import React, { useState, useEffect } from 'react';
import './ProdPrice.css';

import {
  applyPercentagesDecreases,
  applyPercentagesIncreases,
  formatForParcentage,
  defaultPriceFormat,
  formatPrice,
} from './PricingProduct';
import InputGroupPrice from './InputGroupPrice';

function ProdPrice({DataContent}) {
  const [pCost, setPCost] = useState('');
  const [pFees, setPFees] = useState('');
  const [pMargin, setPMargin] = useState('');
  const [pDiscount, setPDiscount] = useState('');
  const [pStock, setPStock] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);
  
// Valores intermediários (em tempo real)
const feesValue = applyPercentagesIncreases(pCost, pFees);
const marginValue = applyPercentagesIncreases(feesValue, pMargin);
const discountValue = applyPercentagesDecreases(marginValue, pDiscount);

useEffect(() => {
  setFinalPrice(discountValue);
}, [pCost, pFees, pMargin, pDiscount, discountValue]);

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
          <span>Valor atribuído</span>
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
