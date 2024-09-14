import React from 'react'
import './CartQuery.css'
const baseURL = window.location.origin;

function CartQuery({setResponse, response, cancelCart}) {
  let urlClient = baseURL+response.cartLink;

  async function clipBoard() {
    try {
      navigator.clipboard.writeText(urlClient)
      window.alert("copiado com sucesso!")
      cancelCart()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div className='pContainer'>
      <div className='cartQuery'>
        <div className="cq-head">
          <h3>Carrinho criado com sucesso!</h3>
        </div>
        <div className="body-cartQuery">
          <input type="text" readOnly value={ `...${response.cartLink}` }/>
          <button
          className='bt bt-approve'
          onClick={clipBoard}
          >Copriar link</button>
        </div>
        <div className="button-container-cq">
          <button 
            className='bt bt-close'
            onClick={()=> setResponse(null)}
          >Fechar</button>
        </div>
      </div>
    </div>
  )
}

export default CartQuery