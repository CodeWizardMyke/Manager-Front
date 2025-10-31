import React, { useEffect, useState } from 'react'
import './productDetails.css'

function ProdDetails({dataProduct}) {
  const [pCost, setPCost] = useState('');
  const [pFees, setPFees] = useState('');
  const [pMargin, setPMargin] = useState('');
  const [pDiscount, setPDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(0);

  // -------------------------------
  // Funções utilitárias
  // -------------------------------

  function parsePrice(val) {
    if (!val) return 0;
    const clean = val.replace(/[^\d]/g, '');
    return Number(clean) / 100;
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

    setPCost(dataProduct.product_cost || 0);
    setPFees(dataProduct.fees_and_taxes || 0);
    setPMargin(dataProduct.profit_margin || 0);
    setPDiscount(dataProduct.discounts || 0);

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
  }, [pCost, pFees, pMargin, pDiscount, dataProduct]);

  function getBrandName(){
    if(dataProduct.brand_name){
      return dataProduct.brand_name
    }
    if(dataProduct.brandProduct){
      return dataProduct.brandProduct.brand_name
    }
    return'N/A';
  }

  function getCategoryName(){
    if(dataProduct.category_name){
      return dataProduct.category_name
    }
    if(dataProduct.categoryProduct){
      return dataProduct.categoryProduct.category_name
    }
    return'N/A';
  }

  return (
    <div className="productDetails">
        <div className="title">
          <h2>{dataProduct.title}</h2>
        </div>
        <div className="details">
          <p><strong>Categoria:</strong> {getCategoryName()}</p>
          <p><strong>Marca:</strong> {getBrandName()}</p>
          <p><strong>Formato do produto:</strong> {dataProduct.product_shape} </p>
          <p><strong>Aroma:</strong> {dataProduct.additional} </p>
          <p><strong>Volume:</strong> {dataProduct.NET_VOLUM} </p>
          <p><strong>Faixa etaria:</strong> {dataProduct.age_group} </p>
        </div>
        <div className="price">
          <p className='selling_p'><strong> R$: {finalPrice.toFixed(2)}</strong></p>
          <p className='original_p'><strong>de:</strong>{pCost}</p>
          <p><strong>Quantidade em estoque:</strong> {dataProduct.stock}</p>
        </div>
        <div className="buyNow">
          <div className='pay_p'>
            <p>R$: {finalPrice.toFixed(2)} </p>
            <input type="number" placeholder='Calcular cep' min={0} />
          </div>
          <div className="delivery">
            <span>{dataProduct.stock > 0 ? "Em estoque agora!" : "Reserve seu produto!"}</span>
            <p>Entregando em toda São Paulo em até 24h após confirmação do pagamento</p>
          </div>
          <button type='button' className='AddToCart'>Adicionar ao carrinho</button>
          <button type='button' className='BuyNow'>Comprar agora</button>
        </div>

      </div>
  )
}

export default ProdDetails