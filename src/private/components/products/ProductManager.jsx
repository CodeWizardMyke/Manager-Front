import React, { useContext, useState } from 'react'
import fetchAxios from '../../axios/config';

import { BiShowAlt } from "react-icons/bi";

import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';
import ProductCreate from './ProductCreate';
import ToolsApp from '../assets/tools/ToolsApp';
import ManagerContext from '../../context/ManagerContext';

function ProductManager() {
  const [ loading, setLoading] = useState(false);
  const [ searchOpt, setSearchOpt ] = useState({query: '', searchType: ''});
  const {pagination, setPagination} = useContext(ManagerContext);

  const [ data, setData] = useState([]);
  const [ prodItem, setProdItem ] = useState(null);

  const sendRequest = async () => {
    try {
      setLoading(true);
      let url = `/product/${searchOpt.query ? 'search/title': 'crud/read'}`;
      let headers = {
        page:pagination.page, size:pagination.size,
        title: searchOpt.query, query: searchOpt.query,
      };

      const response = await fetchAxios.get(url, { headers: headers });
      setData(response.data.rows);

      pagination.count =  response.data.count;
      setPagination(pagination);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }; 

  return (
    <>
        { prodItem && <ProductCreate prodItemData={prodItem} setProdItemData={setProdItem} /> }
        { !prodItem && (
        <div className='module-content'>
          { loading && <Loading/> }
          <div className="utils-content">
            <ToolsApp setQuerySearch={setSearchOpt} searchFunction={sendRequest} />
          </div>
          <div className="module-actions">
            <div className="content-table">
              <table>
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Título</th>
                      <th>Categoria</th>
                      <th>Preço</th>
                      <th>Estoque</th>
                      <th>Mostrar + </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.length > 0 && (
                        data.map((item,index) => (
                          <tr key={`prodsc_${index+Math.random()}`}>
                            <td>{item.product_id}</td>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td><button className='bt-show-Prod' onClick={()=> {setProdItem(item)}}
                            ><BiShowAlt/></button></td>
                        </tr>
                        ))
                      )
                    }
                  </tbody>
              </table>  
            </div>
            <Pagination sendRequest={sendRequest}/>
          </div>
        </div>
        )}
    </>
  )
}

export default ProductManager