import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../../context/CartProvider'
import WrapperProgress from '../assets/WrapperProgress';
import { FaTrashAlt } from "react-icons/fa";

function ShowCart() {
  const { productsData, setProductsData } = useContext(CartContext);
  const [ cartPrice, setCartPrice ] =useState(0);
  const [ qtdProducts, setQtdProducts ] = useState(0);

  const handdleCartRemove = (item) => {
    const newArrProd = productsData.map( product => {
        if(product.product_id === item.product_id){
          product.stock = Number(product.qtd_products) + Number(product.stock)
          product.inCart = false
        }
        return product
      }
    )  
    setProductsData(newArrProd);
  }

  useEffect(()=>{

    let price = productsData.reduce((acc, item) => (
      item.inCart ? Number(item.price) * Number(item.qtd_products) : 0
    )+acc,0)

    let formatingPrice = price.toLocaleString( 'pt-br',{ style:"currency", currency:"BRL"})
    setCartPrice(formatingPrice);

    let qtd = productsData.reduce((acc, item) => (
      item.inCart ? Number(item.qtd_products) : 0
    ) + acc,0);
    setQtdProducts(qtd);

  },[productsData])

  function cleanCartHanddler(){
    const cleanCart = productsData.map((item) => {
      if(item.inCart){
        item.stock = Number(item.stock) + Number(item.qtd_products);
        item.inCart = false;
      }
      return item;
    })
    setProductsData(cleanCart);
  }

  return (
    <div className='module-content'>
      <div className="top-utils">
        <WrapperProgress/>
      </div>
      <div className="utils-content">

        <div className="util-box">
          <div className="util-func">
            <label htmlFor="search">Valor carrinho</label>
            <input type="text" name="search" className='txt-center' id="search" readOnly value={cartPrice} />  
          </div>  
          <div className='util-func'>
            <label htmlFor="search_by">Qtd Produtos</label>
            <input type="number" name="search" className='txt-center' id="search" readOnly value={qtdProducts}/>  
          </div>
        </div>

        <button className='bt bt-clean' onClick={cleanCartHanddler}>Limpar carrinho</button>

      </div>
      <div className="module-actions">
        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Marca</th>
                <th>Preço</th>
                <th>QTD</th>
                <th>Remover</th>
              </tr>
            </thead>
            <tbody>
              {
                productsData.length > 0 && (
                  productsData.map((item,index) => (
                    
                    item.inCart ? (
                      <tr key={`prodsc_${index+Math.random()}`}>
                        <td>{item.product_id}</td>
                        <td>{item.title}</td>
                        <td>{item.category}</td>
                        <td>{item.price}</td>
                        <td>{item.qtd_products}</td>
                        <td>
                          <button className='bt-remove' onClick={() => handdleCartRemove(item) }>
                            <FaTrashAlt/>
                          </button>
                        </td>
                    </tr>
                    ): ""
                  ))
                )
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ShowCart