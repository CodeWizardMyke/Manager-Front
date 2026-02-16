import React, { useEffect, useMemo, useState } from 'react'
import './TableLayout.css'
import fetchAxios from '../../axios/config';
import pricingProduct from '../../functions/pricingProduct';

function getData(element, item ){
  let value = element[item.value];

  if(typeof value === "number") return value;

  if(typeof value === "string"){
    return value.slice(0, item.maxLength);
  }

  if(value && typeof value === "object"){
    const stringValues = Object.values(value).find( v => typeof v === "string");
    if(stringValues) return stringValues.slice(0, 45)
  }
  return "-"
}

function TableCartProductList({
    cartData, 
    settings, 
    resetDataSelected,
    setLoading
  }){

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);



  const processedData = useMemo(() => {

    return data.map(row => settings.map(col => {
      const itemCart = row.product;
      itemCart.qtd = row.qtd_products;
      itemCart.totUnd = pricingProduct(1, row.product.product_cost)
      itemCart.tot = pricingProduct(row.qtd_products, row.product.product_cost);
      return getData(itemCart, col);
    }))
  }, [data, settings]);

  function previusPage(){
    if(page >1){
      setPage(page - 1);
    }
  }

  function nexPage(){
    const maxPages =   count / size
    if(page < maxPages){
      setPage(page + 1)
    }
  }

  async function getCartProductList() {
    try {
      setLoading(true);

      const promisse = await fetchAxios.get("cart_item/crud/read",{headers:{cart_id:cartData.cart_id}})
      
      if(promisse){

        if(promisse.data){
          if(promisse.data.rows) setData(promisse.data.rows);
          if(promisse.data.count) setCount(promisse.data.count);
        }
      }

      setLoading(false);
      
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(cartData){
      getCartProductList()
    }
  },[cartData])

  return (
    <>
      <div className="contentTable">
       <div className="table-header-info">
          <button type='button' className='prevBtn' onClick={resetDataSelected}>Carrinhos do cliente</button>
          <h2>Todos os produtos do carrinho: id:{cartData.cart_id}</h2>
       </div>
      <table>
        <thead>
          <tr>
            {
              settings.map((item,index) => <>
                <th key={`tHeadTh_:${index}`} >{item.label}</th>
              </> )
            }
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr 
              key={`row-${rowIndex}`}
            >
              {row.map((cell, colIndex) => (
                  <td key={`cell-${colIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="tablePagination">
    <div className="wrapperBtns">
      <button 
        type="button"
        onClick={previusPage}
      > Voltar </button>
      <button 
        type="button"
        onClick={nexPage}
      > Avançar </button>
    </div>
      <div className="lengthListBtn">
        <select 
          onChange={e => setSize(e.target.value) }
          value={size}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
    </div>
    </>
  )
}

export default TableCartProductList
