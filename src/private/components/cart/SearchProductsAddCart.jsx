import React, { useContext, useState } from 'react'

// imports outher components
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';
import fetchAxios from '../../axios/config';
import ToolsApp from '../assets/tools/ToolsApp';
import WrapperProgress from './assets/WrapperProgress';
import SearchTable from './assets/SearchTable';
import ProductCreate from '../products/ProductCreate';
import {CartContext} from '../../context/CartProvider';

function SearchProductsAddCart({cartStates}) {
  const { productsData, setProductsData, loading, setLoading, navigate, setNavivate, } = cartStates;
  const [ pagination, setPagination ]  = useState({size:15,page:0,count:1})
  const [ searchOpt, setSearchOpt ] = useState({query: '', searchType: ''});
  const [ productShow, setProductShow ]= useState(null);

  const {cartNavigate} = useContext(CartContext)
  console.log(cartNavigate)

  async function searchReq() {
    try {
      setLoading(true);

      let url = `/product/${searchOpt.query ? 'search/'+searchOpt.searchType : 'crud/read'}`
      let options = { 
        page:pagination.page, size:pagination.size, 
        title:searchOpt.query, query: searchOpt.query,
      }
      const response = await fetchAxios.get(url, {headers:options});
      
      setProductsData(response.data.rows);
      pagination.count =  response.data.count;
      setPagination(pagination);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      window.alert(error);
      console.log(error);
    }
  }

  return (
    <div className='module-content'>
      { productShow && <ProductCreate prodItemData={productShow} setProdItemData={setProductShow} /> }
      { loading && <Loading/> }
      { !productShow && (
        <>
          <div className="top-utils">
            <WrapperProgress navigate={navigate} setNavivate={setNavivate} />
          </div>
          <div className="utils-content">
            <ToolsApp setQuerySearch={setSearchOpt} searchFunction={searchReq} setProductShow={setProductShow} />
          </div>
          <div className="module-actions">
            <SearchTable productsData={productsData} setProductsData={setProductsData} setProductShow={setProductShow} />
            <Pagination  pagination={pagination} setPagination={setPagination} sendRequest={searchReq} />
          </div>
        </>
      )}
    </div>
  )
}

export default SearchProductsAddCart;