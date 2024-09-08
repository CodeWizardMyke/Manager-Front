import React, { useState } from 'react'
import { BiShowAlt } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";

function SearchTable({productsData, setProductsData, setProductShow}) {
  const [prodSelect, setProdSelect] = useState(null);

  function addItemCart(){
   const productsInCart = productsData.map(product => {

      if(product.product_id === prodSelect.product_id){
        if( product.stock >=  product.qtd_products){
          product.stock -= product.qtd_products;
        }else{
          product.qtd_products = product.stock;
        }
        product.inCart = true;
        console.log(product)
      }
      return product
    })
    setProductsData(productsInCart);
    setProdSelect(null);
  }

  return (
    <div className="content-table">
      < table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>Marca</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Mostrar +</th>
              <th>Carrinho</th>
            </tr>
          </thead>
          <tbody>
            {
              productsData.length > 0 && (
                productsData.map((item,index) => (
                  <tr key={`prodsc_${index+Math.random()}`}>
                    <td>{item.product_id}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                    <td>
                      <button 
                        className='bt-show-Prod'
                        onClick={() => {
                          setProductShow(item)
                        }}
                      >
                        <BiShowAlt/>
                      </button>
                    </td>
                    <td>
                      <button onClick={()=>{setProdSelect(item)}} className='bt-cartAdd'>
                        <FaCartPlus/>
                      </button>
                    </td>
                </tr>
                ))
              )
            }
          </tbody>
      </table>
      {
        prodSelect && (
          <div className="table-item-select">
            <div className="table-item-select-header">
              <h3>Adicionar ao carrinho!</h3>
              <button 
                className='bt bt-close'
                onClick={()=>{setProdSelect(null)}}
              >close</button>
            </div>
            <div className='cart-item-detail'>
              <span className='cid-title'>Produto selecionado</span>
              <div className='d-flex-r mt-5'>
                <div className='wrapper-label'>
                  <label htmlFor="prod_name" >Nome</label>
                </div>
                <input type="text" id='prod_name' value={prodSelect.title} readOnly/>
              </div>
              <div className='d-flex-r mt-5'>
                <div className='wrapper-label'>
                  <label htmlFor="prod_id">ID</label>
                </div>
                <input type="number" id="prod_id" value={prodSelect.product_id} readOnly/>
              </div>
            </div>
            <div className="cart-inputs">
              <div className='d-flex-r'>
                <div className='wrapper-label'>
                  <label htmlFor="qtd">Quantidade</label>
                </div>
                <input type="number" id="qtd" min={1} className='w-10' max={ prodSelect.stock } onChange={(e)=> prodSelect.qtd_products = e.target.value } />
              </div>
              <button 
                className='bt bt-add-cart'
                onClick={addItemCart}
              >Adicionar <FaCartPlus/> </button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default SearchTable