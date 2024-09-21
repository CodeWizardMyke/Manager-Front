import React from 'react'

function ClientCreateUtils() {
  return (
    <>
      <div className="util-box">
        <div className="util-func fn-custom">
          <span>Nota do cliente</span>
          <h2>A</h2>
          <p>relacionamento com cliente</p>
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

export default ClientCreateUtils