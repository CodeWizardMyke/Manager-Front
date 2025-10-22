import React from 'react'
import './productDetails.css'

function ProdDetails({dataProduct}) {

  const discounted = (dataProduct.selling_price - (dataProduct.selling_price * dataProduct.discounts) / 100).toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'});
  const price = Number(dataProduct.selling_price).toLocaleString('pt-BR', {currency: 'BRL', style: 'currency'});

  return (
    <div className="productDetails">
        <div className="title">
          <h2>{dataProduct.title}</h2>
        </div>
        <div className="details">
          <p><strong>Categoria:</strong> {dataProduct.category_name}</p>
          <p><strong>Marca:</strong> {dataProduct.brand_name}</p>
          <p><strong>Formato do produto:</strong> {dataProduct.product_shape} </p>
          <p><strong>Aroma:</strong> {dataProduct.additional} </p>
          <p><strong>Volume:</strong> {dataProduct.NET_VOLUM} </p>
          <p><strong>Faixa etaria:</strong> {dataProduct.age_group} </p>
        </div>
        <div className="price">
          <p className='selling_p'><strong>{discounted}</strong></p>
          <p className='original_p'><strong>de:</strong>{price}</p>
          <span>Em até 3x R$ 39,99 sem juros</span>
          <p><strong>Quantidade em estoque:</strong> {dataProduct.stock}</p>
        </div>
        <div className="buyNow">
          <div className='pay_p'>
            <p> {discounted} </p>
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