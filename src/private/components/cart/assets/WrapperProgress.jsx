import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartProvider'

function WrapperProgress() {
  const {setNavigate} = useContext(CartContext);

  return (
    <div className="wrapper-progreess">
      <div className={`wp-item products_search`}>
        <button onClick={()=> setNavigate('products')}>Buscar Produtos</button>
      </div>
      <div className="wp-item cart_selection">
        <button onClick={()=> setNavigate('cart')}>Selecionar Carrinho</button>
      </div>
      <div className="wp-item client_search">
        <button onClick={()=> setNavigate('clients')}>Buscar Cliente</button>
      </div>
  </div>
  )
}

export default WrapperProgress