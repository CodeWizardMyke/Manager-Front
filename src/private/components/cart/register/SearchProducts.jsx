import React, { useContext, useState } from 'react'

// imports outher components
import Pagination from '../../assets/paginate/Paginate';
import Loading from '../../loading/Loading';
import fetchAxios from '../../../axios/config';
import ToolsApp from '../../assets/tools/ToolsApp';
import WrapperProgress from '../assets/WrapperProgress';
import SearchTable from './SearchTable';
import ProductCreate from '../../products/ProductCreate';
import {CartContext} from '../../../context/CartProvider';
import ManagerContext from '../../../context/ManagerContext';

function SearchProducts() {
  const { setProductsData, loading, setLoading} = useContext(CartContext);
  const { pagination, setPagination } = useContext(ManagerContext);
  const [ searchOpt, setSearchOpt ] = useState({query: '', searchType: ''});
  const [ productShow, setProductShow ]= useState(null);

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
      { loading && <Loading/> }
      {
        productShow ? (
          productShow && <ProductCreate prodItemData={productShow} setProdItemData={setProductShow} />
        ) : 
        (
          <>
            <div className="top-utils">
              <WrapperProgress/>
            </div>
            <div className="utils-content">
              <ToolsApp setQuerySearch={setSearchOpt} searchFunction={searchReq} setProductShow={setProductShow} />
            </div>
            <div className="module-actions">
              <SearchTable setProductShow={setProductShow} />
              <Pagination sendRequest={searchReq} />
            </div>
          </>
        )
      }
    </div>
  )
}

export default SearchProducts;