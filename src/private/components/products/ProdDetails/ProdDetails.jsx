import React from 'react'
import './productDetails.css'

import { formatPrice } from '../pricing/PricingProduct';

function ProdDetails({dataProduct}) {
  const pCost = dataProduct.product_cost ? dataProduct.product_cost : 0;
  const finalPrice = dataProduct.selling_price ? dataProduct.selling_price : 0;
  
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
          <p className='selling_p'><strong>{formatPrice(finalPrice)}</strong></p>
          <p className='original_p'><strong>de:</strong>{formatPrice(pCost)}</p>
          <p><strong>Quantidade em estoque:</strong> {dataProduct.stock}</p>
        </div>
        <div className="buyNow">
          <div className='pay_p'>
            <p>{formatPrice(finalPrice)} </p>
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