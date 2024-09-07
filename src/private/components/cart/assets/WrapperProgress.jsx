import React from 'react'

function WrapperProgress({navigate, setNavigate}) {
  return (
    <div className="wrapper-progreess">
      <div className={`wp-item products_search`}>
        <button>Buscar Produtos</button>
      </div>
      <div className="wp-item cart_selection">
        <button>Selecionar Carrinho</button>
      </div>
      <div className="wp-item client_search">
        <button>Buscar Cliente</button>
      </div>
  </div>
  )
}

export default WrapperProgress