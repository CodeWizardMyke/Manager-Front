import React, { useState, useEffect } from 'react';
import './ProdPrice.css';

function ProdPrice() {
  const [pCost, setPCost] = useState('');
  const [pFees, setPFees] = useState('');
  const [pMargin, setPMargin] = useState('');
  const [pDiscount, setPDiscount] = useState('');
  const [pStock, setPStock] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  // -------------------------------
  // Funções utilitárias
  // -------------------------------
  function formatedPrice(val) {
    const formated = val.replace(/[^\d]/g, '');
    return (formated / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  function parsePrice(val) {
    if (!val) return 0;
    const clean = val.replace(/[^\d]/g, '');
    return Number(clean) / 100;
  }

  function formatedPercentage(val) {
    const num = parseFloat(val);
    if (isNaN(num) || num < 0) return '0%';
    if (num > 100) return '100%';
    return `${num}%`;
  }

  function parsePercentage(val) {
    const num = parseFloat(val);
    if (isNaN(num)) return 0;
    if (num < 0) return 0;
    if (num > 100) return 100;
    return num;
  }

  // -------------------------------
  // Cálculo do preço final
  // -------------------------------
  useEffect(() => {
    const cost = parsePrice(pCost);
    const fees = parsePercentage(pFees);
    const margin = parsePercentage(pMargin);
    const discount = parsePercentage(pDiscount);

    // -------------------------------
    // custo + taxas + margem - desconto
    // -------------------------------

    const taxed = cost + (cost * fees) / 100;
    const profit = taxed + (taxed * margin) / 100;
    const discounted = profit - (profit * discount) / 100;

    setFinalPrice(discounted || 0);
  }, [pCost, pFees, pMargin, pDiscount]);


  return (
    <div className="ProdPrice">
      <div className="price-inputs">

        {/* PREÇO DE CUSTO */}
        <div className="input-group">
          <label htmlFor="product_cost">Preço custo:</label>
          <input
            type="text"
            id="product_cost"
            placeholder="0,00"
            onChange={(e) => setPCost(formatedPrice(e.target.value))}
          />
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input type="text" disabled value={pCost} placeholder="R$ 0,00" />
          </div>
          <input
            type="number"
            className="hidden"
            name="product_cost"
            value={parsePrice(pCost)}
            readOnly
          />
        </div>

        {/* TAXAS / IMPOSTOS */}
        <div className="input-group">
          <label htmlFor="fees_and_taxes">Taxas/impostos (%):</label>
          <input
            type="number"
            id="fees_and_taxes"
            placeholder="0"
            step="1"
            min="0"
            max="100"
            onChange={(e) => setPFees(e.target.value)}
          />
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input
              type="text"
              disabled
              value={formatedPercentage(pFees)}
              placeholder="0%"
            />
          </div>
          <input
            type="number"
            className="hidden"
            name="fees_and_taxes"
            value={parsePercentage(pFees)}
            readOnly
          />
        </div>

        {/* MARGEM DE LUCRO */}
        <div className="input-group">
          <label htmlFor="profit_margin">Margem/Lucro (%):</label>
          <input
            type="number"
            id="profit_margin"
            placeholder="0"
            step="1"
            min="0"
            max="100"
            onChange={(e) => setPMargin(e.target.value)}
          />
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input
              type="text"
              disabled
              value={formatedPercentage(pMargin)}
              placeholder="0%"
            />
          </div>
          <input
            type="number"
            className="hidden"
            name="profit_margin"
            value={parsePercentage(pMargin)}
            readOnly
          />
        </div>

        {/* DESCONTO */}
        <div className="input-group">
          <label htmlFor="discounts">Desconto (%):</label>
          <input
            type="number"
            id="discounts"
            placeholder="0"
            step="1"
            min="0"
            max="100"
            onChange={(e) => setPDiscount(e.target.value)}
          />
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input
              type="text"
              disabled
              value={formatedPercentage(pDiscount)}
              placeholder="0%"
            />
          </div>
          <input
            type="number"
            className="hidden"
            name="discounts"
            value={parsePercentage(pDiscount)}
            readOnly
          />
        </div>

        {/* MOEDA */}
        <div className="input-group">
          <label htmlFor="currency">Moeda</label>
          <select name="currency" id="currency" className="text_align-center">
            <option value="BRL">Real (BRL)</option>
          </select>
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input type="text" disabled placeholder="BRL" />
          </div>
        </div>

        {/* ESTOQUE */}
        <div className="input-group">
          <label htmlFor="stock">Estoque:</label>
          <input
            type="number"
            id="stock"
            placeholder="0"
            step="1"
            min="0"
            max="100000"
            onChange={(e) => setPStock(e.target.value)}
          />
          <div className="formated-value">
            <span> Valor atribuído </span>
            <input type="text" disabled value={pStock} placeholder="0" />
          </div>
          <input
            type="number"
            className="hidden"
            name="stock"
            value={pStock || 0}
            readOnly
          />
        </div>

        {/* PREÇO FINAL */}
        <div className="input-group final-price">
          <label htmlFor="final-price">Preço Final:</label>
          <input
            type="text"
            id="final-price"
            value={finalPrice.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
            disabled
            readOnly
          />
          <input
            type="number"
            className="hidden"
            name="final_price"
            value={finalPrice}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default ProdPrice;
