import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartProvider'

function WrapperProgress({first,secound,third}) {
  const {setNavigate} = useContext(CartContext);

  return (
    <div className="wrapper-progreess">
      <div className={`wp-item products_search`}>
        <button onClick={()=> setNavigate('first')}>{ first ? first : 'Buscar Produtos'}</button>
      </div>
      <div className="wp-item cart_selection">
        <button onClick={()=> setNavigate('secound')}>{secound ? secound : 'Selecionar Carrinho'}</button>
      </div>
      <div className="wp-item client_search">
        <button onClick={()=> setNavigate('third')}>{third ? third : 'Buscar Cliente'}</button>
      </div>
  </div>
  )
}

export default WrapperProgress;