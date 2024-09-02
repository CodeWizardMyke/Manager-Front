import React, { useCallback, useEffect, useState } from 'react'
import HeadUtil from '../assets/head_util/HeadUtil'
import { BiShowAlt } from "react-icons/bi";
import fetchAxios from '../../axios/config';
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';

function ProductManager() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [size, setSize] = useState(15);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  let filter = ''

  const sendRequest = useCallback(async () => {
    try {
      setLoading(true);
      let url = `/product/${searchBy ? 'search/' + searchBy : 'crud/read'}`;
      let headers = {
        page: page,
        size: size,
        title: query,
        query: query
      };

      const response = await fetchAxios.get(url, { headers: headers });
      setData(response.data.rows);
      setCount(response.data.count);
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, [page, size, searchBy, query]); 

  useEffect(() => {
    if (page > 0) {
      sendRequest();
    }
  }, [page, sendRequest]); 


  const configHeadUtil = {
    search:{
      options:[
        {value:'title',txt:'título'},
        {value:'id',txt:'id'},
      ],
    },
    filter:{
      options:[
        {value:'id',txt:'id'},
        {value:'title',txt:'título'},
      ],
    },
  }

  return (
    <div className='module-content'>
      { loading && <Loading/> }
      <div className="utils-content">
        <HeadUtil configHeadUtil={configHeadUtil} setSearchBy={setSearchBy} setQuery={setQuery} filter={filter} sendRequest={sendRequest} />
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
                  <th>Exibir</th>
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
                        <td><button><BiShowAlt/></button></td>
                    </tr>
                    ))
                  )
                }
              </tbody>
          </table>  
        </div>
        <Pagination setSize={setSize} setPage={setPage} count={count} size={size}  page={page} />
      </div>
    </div>
  )
}

export default ProductManager