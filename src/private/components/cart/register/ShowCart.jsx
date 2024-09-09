import React, { useContext } from 'react'
import { CartContext } from '../../../context/CartProvider'
import WrapperProgress from '../assets/WrapperProgress';
import { FaTrashAlt } from "react-icons/fa";

function ShowCart() {
  const { productsData, setProductsData } = useContext(CartContext);

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

  return (
    <div className='module-content'>
      <div className="top-utils">
        <WrapperProgress/>
      </div>
      <div className="utils-content">
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