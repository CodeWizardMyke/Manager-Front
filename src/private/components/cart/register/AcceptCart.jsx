import React from 'react'
import ClientHistoricBuy from '../assets/ClientHistoricBuy'
import WrapperProgress from '../assets/WrapperProgress'
import DownloadData from '../../assets/tools/DownloadData'
import './AccepptCart.css';


function AcceptCart() {
  return (
    <div className='module-content'>
      <div className="top-utils">
      <WrapperProgress/>
      </div>
      <div className="utils-content">
        <ClientHistoricBuy/>
        <DownloadData/>
      </div>
      <div className="module-actions">
        <div className="dual-box-x">
          <div className="box-x-left">
            <div className="cartResume">
              <div>
                <label htmlFor="priceCart">Valor final do carrinho</label>
                <input type="text" id='priceCart' readOnly  value={'R$: 0.00'}/>
              </div>
              <div>
                <label htmlFor="qtd_cart">Valor final do carrinho</label>
                <input type="number" id='qtd_cart' readOnly  value={1}/>
              </div>
            </div>
            <div className="content-table cb-h">
              <table>
                <thead>
                  <tr>
                    <th>ID:</th>
                    <th>Nome do produto</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Qtd Produtos</th>
                    <th>Valor do pedido</th>
                  </tr>
                </thead>
                <tbody>

                </tbody>
              </table>
            </div>
          </div>
          <div className="box-x-rigth">
            <div className="contentClientData">
              <div className="clientDataItem">
                <span className="title">Dados do cliente</span>
                <div className='jsf'>
                  <label htmlFor="clientName">Nome</label>
                  <input type="text" readOnly  id='clientName' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="email">email</label>
                  <input type="text" readOnly  id='email' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="clientInstagram">Instagram</label>
                  <input type="text" readOnly  id='clientInstagram' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="telephone">Telefone</label>
                  <input type="text" readOnly  id='telephone' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="clientCPF">CPF</label>
                  <input type="text" readOnly  id='clientCPF' value={''}/>
                </div>
              </div>
              <div className="clientDataItem">
                <span className="title">Endereçõ de entrega</span>
                <div className='jsf'>
                  <label htmlFor="state">Estado</label>
                  <input type="text" readOnly  id='state' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="city">Cidade</label>
                  <input type="text" readOnly  id='city' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="district">Bairro</label>
                  <input type="text" readOnly  id='district' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="road">Rua</label>
                  <input type="text" readOnly  id='road' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="road_number">Número °</label>
                  <input type="text" readOnly  id='road_number' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="complement">Complemento</label>
                  <input type="text" readOnly  id='complement' value={''}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="postal_code">CEP</label>
                  <input type="text" readOnly  id='postal_code' value={''}/>
                </div>
              </div>
            </div>
            <div className="cart-actions">
              <span className="title">Açoes do carrinho</span>
              <button className='bt bt-cancel'>Cancelar</button>
              <button className='bt bt-approve'>Aprovar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcceptCart