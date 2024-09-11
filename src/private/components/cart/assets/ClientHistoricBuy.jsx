import React from 'react'

function ClientHistoricBuy() {
  return (
    <>
      <div className="util-box">
        <span>Descontos</span>
        <div className="util-func">
          <div className='d-flex-row'>
            <label htmlFor="promotions">Sobre Compra</label>
            <input type="text" id='promotions' className='txt-center w-5' readOnly value={ "0%"}/>
          </div>
          <h3>R$: 0</h3>
        </div>
        <div className="util-func">
          <div className='d-flex-row'>
            <label htmlFor="promotions">Sobre Entrega</label>
            <input type="text" id='promotions' className='txt-center w-5' readOnly value={ "0%"}/>
          </div>
          <h3>R$: 0</h3>
        </div>
      </div>

      <div className="util-box">
        <span>Histórico de compras do cliente</span>
        <div className="util-func">
            <label htmlFor="promotions">Média Anual</label>
          <h3>R$: 0.00</h3>
        </div>
        <div className="util-func">
          <div className='d-flex-row'>
            <label htmlFor="promotions">Média mensal</label>
          </div>
          <h3>R$: 0.00</h3>
        </div>
      </div>

    </>
  )
}

export default ClientHistoricBuy