import React, { useContext } from 'react'
import ClientHistoricBuy from '../assets/ClientHistoricBuy'
import WrapperProgress from '../assets/WrapperProgress'
import DownloadData from '../../assets/tools/DownloadData'
import './AccepptCart.css';
import { CartContext } from '../../../context/CartProvider';
import fetchAxios from '../../../axios/config';
import Loading from '../../loading/Loading';

function AcceptCart() {
  const {productsData, setProductsData, clientData, setClientData, setNavigate, loading, setLoading} = useContext(CartContext);
  
  const cartItems = productsData.filter( product => product.inCart === true);
  let cartPrice = productsData.reduce((acc, product) => ( product.inCart ? Number(product.price) * Number(product.qtd_products) : 0 ) + acc ,0)
  let qtd_items = productsData.reduce((acc, product) => ( product.inCart ? Number(product.qtd_products) : 0 ) + acc ,0)


  async function approvedCart() {
    try {
      setLoading(true)
      const body ={
        clientInstagram: clientData.clientInstagram,
        clientName: clientData.clientName,
        items:cartItems
      }

      const response = await fetchAxios.post('/cart/crud/create', body)
      setLoading(false)
      
      console.log(response)
      window.alert('Criado com sucesso!');

      cartCancel();
    } catch (error) {
      setLoading(false)
      console.log(error);
      window.alert('Erro inesperado', error);
    }
  }

  function cartCancel() {
    const removeCart = productsData.map( (product) => {
      if(product.inCart){
        product.inCart = false;
        product.stock = Number(product.stock) + Number(product.qtd_products);
      }
      return product;
    })
    setProductsData(removeCart);
    setClientData(null);
    setNavigate('products');
  }

  return (
    <div className='module-content'>
      {loading && <Loading/>}
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
                  {cartItems.length > 0 && (
                    cartItems.map((product, index) => (
                      <tr key={product.product_id +'prodcart'}>
                        <td>{product.product_id}</td>
                        <td>{product.title}</td>
                        <td>{product.category}</td>
                        <td>{product.price}</td>
                        <td>{product.qtd_products}</td>
                        <td>{ Number(product.qtd_products) * Number(product.price)}</td>
                      </tr>
                    ))
                  )}
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
                onClick={cartCancel}
              >Cancelar</button>
              <button 
                className='bt bt-approve'
                onClick={approvedCart}
              >Aprovar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcceptCart