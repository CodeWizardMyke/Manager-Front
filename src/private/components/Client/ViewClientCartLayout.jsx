import React, { useEffect, useState } from 'react';
import TopBar from '../TopBar/TopBar';
import Loading from '../loading/Loading';

import cartTableData from '../../configs/clients/settingsCartTableData.json'
import cartProductList from '../../configs/clients/settingsCartProductList.json'

import './ViewClientCartLayout.css'
import TableLayoutCart from '../Table/TableLayoutCart';
import fetchAxios from '../../axios/config';
import TableCartProductList from '../Table/TableCartProductList';

const ViewClientCartLayout = ({clientData, previousPage}) => {
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0);
  const [itemSelected, setItemSelected] = useState(null);
  const [toggleView, setToggleView] = useState(false);

  async function getClientCartItems() {
    try {
      setLoading(true);
      const promisse = await fetchAxios.get("cart/search/client",{headers:{client_id:clientData.client_id}})
      
      if(promisse){

        if(promisse.data){
          if(promisse.data.rows) setCartData(promisse.data.rows);
          if(promisse.data.count) setCount(promisse.data.count);
        }
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(()=>{
    if(clientData){
      getClientCartItems();
    }
  },[clientData])

  
  const clickItem = (item) => {
    setItemSelected(item);
    setToggleView(true);
  };

  const resetDataSelected = () => {
    setItemSelected(null);
    setToggleView(false);
  };

  return (
    <>
      { loading && <Loading /> }

      <TopBar text={'Histórico de compras do cliente'}/>
      <div className="section">
        <div className="section-header">
          <h2>Cliente: {clientData ? clientData.clientName : ""}</h2>
          <div className="cart-detail">
            <span>Total de compras: </span>
            <span>Data da última compra: </span>
          </div>
        </div>

        <div className="section-body">
          {toggleView ? 
          <>
            <TableCartProductList 
              cartData={itemSelected}
              resetDataSelected={resetDataSelected}
              settings={cartProductList}
              setLoading={setLoading}
            />
          </>   :
          <>
            <div className="table-header-info">
              <button type='button' className='prevBtn' onClick={previousPage}>voltar a busca de cliente</button>
              <h2>Listagem de todos os carrinhos do cliente</h2>
            </div>
            <TableLayoutCart
              data={cartData} // agora exibe os dados filtrados
              settings={cartTableData}
              clickItem={clickItem}
              page={page}
              setPage={setPage}
              size={size}
              setSize={setSize}
              count={count}
            />
          </>
        }
        </div>
      </div>
    </>
  );
}

export default ViewClientCartLayout;
