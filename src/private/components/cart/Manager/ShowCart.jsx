import React, { useCallback, useContext, useEffect, useState } from 'react'
import WrapperProgress from '../assets/WrapperProgress'
import { CartContext } from '../../../context/CartProvider';
import Loading from '../../loading/Loading';
import ClientHistoricBuy from '../assets/ClientHistoricBuy';
import DownloadData from '../../assets/tools/DownloadData';
import fetchAxios from '../../../axios/config';

function ShowCart() {
  const { clientData, clientCart, setClientCart, setNavigate, loading, setLoading} = useContext(CartContext);
  const [ cartItems, setCartItems] = useState([]);

  const cartPrice = clientCart.amount
  const qtd_items = clientCart.qtd_products

  const getCartItemsData = useCallback (async () => {
    try {
      setLoading(true);
      const url = '/cart_item/crud/read'
      const options = {
        cart_id:clientCart.cart_id,
        state:clientCart.state
      }

      const response = await fetchAxios.get(url,{headers:options});
      setCartItems(response.data.rows)

      console.log(response)
      setLoading(false);
    } catch (error) {
      console.log(error);
      window.alert(error);
      setLoading(false);
    }
  },[clientCart,setLoading])


  useEffect(()=>{
    if( !clientCart || !clientData ){
      window.alert("Nenhum cliente foi selecionado ou nenhum carrinho foi selecionado!");
      setNavigate('first');
    }
    getCartItemsData()
  },[clientCart,clientData, getCartItemsData, setNavigate])

  function destroyCart() {
    setLoading(true);

    if(clientCart.state === 'pendding'){
      setClientCart(null)
      deleteCart();
      setNavigate('first');
    }else{
      window.alert('Pedido recusado, não é possível remover um carrinho já aprovado');
    }

    async function deleteCart() {
      try {
        const url = '/cart/crud/destroy';
        const options = {cart_id: clientCart.cart_id};
        await fetchAxios.delete(url,{headers:options});
        window.alert('Carrinho removido com sucesso!');
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    }
    setLoading(false);
  }

  return (
    <div className="module-content">
      { loading && <Loading />}
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
                <input type="text" id='priceCart' readOnly  value={cartPrice.toLocaleString('pt-br',{style:'currency', currency:'BRL'})}/>
              </div>
              <div>
                <label htmlFor="state">Estado do carrinho</label>
                <input type="text" id='state' readOnly  value={clientCart.state}/>
              </div>
              <div>
                <label htmlFor="qtd_cart">QTD de items no carrinho </label>
                <input type="number" id='qtd_cart' readOnly  value={qtd_items}/>
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
                  {
                    cartItems.length > 0 && (
                      cartItems.map((item,index) => (
                        <tr key={item.cart_item_id+index}>
                          <td>{item.product.product_id}</td>
                          <td>{item.product.title}</td>
                          <td>{item.product.category}</td>
                          <td>{item.product.price}</td>
                          <td>{item.qtd_products}</td>
                          <td>{ Number(item.qtd_products * Number(item.product.price))}</td>
                        </tr>
                      ))
                    )
                  }
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
                  <input type="text" readOnly  id='clientName' value={clientData.clientName}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="email">email</label>
                  <input type="text" readOnly  id='email' value={clientData.email}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="clientInstagram">Instagram</label>
                  <input type="text" readOnly  id='clientInstagram' value={clientData.clientInstagram}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="telephone">Telefone</label>
                  <input type="text" readOnly  id='telephone' value={clientData.telephone}/>
                </div>
                <div className='jsf'>
                  <label htmlFor="clientCPF">CPF</label>
                  <input type="text" readOnly  id='clientCPF' value={clientData.cpf}/>
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
              <button 
                className='bt bt-cancel'
                onClick={destroyCart}
              >Apagar carrinho</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowCart