import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';
import fetchAxios from '../../axios/config';
import HeadUtil from '../assets/head_util/HeadUtil';
import { BiShowAlt } from "react-icons/bi";

const configUtils = {
  search:{
    options:[
      {value:'title',txt:'Nome produto'},
    ],
  },
  filter:{
    options:[
      {value:'id',txt:'id'},
      {value:'title',txt:'Nome produto'},
    ],
  },
}

function RegisterCart() {
  const [ size, setSize ] = useState(15);
  const [ page, setPage ] = useState(0);
  const [ count, setCount ] =useState(1);
  const [ loading, setLoading ] = useState(false);

  const [ data, setData ]= useState([]);
  const [ searchBy, setSearchBy ] = useState("");
  const [ query, setQuery ] = useState("");
  let filter = searchBy;

  const sendRequest = useCallback( async () => {
    try {
      setLoading(true);

      let url = `/product/${query ? 'search/title' : 'crud/read'}`
      let options = {
        page:page,
        size:size,
        title:query,
      }

      const response = await fetchAxios.get(url, {headers:options});
      setData(response.data.rows);
      setCount(response.data.count);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      window.alert(error);
      console.log(error);
    }
  }, [page, size, query])

  useEffect(() => {
    if (page > 0) {
      sendRequest();
    }
  }, [page, sendRequest]); 

  return (
    <div className='module-content'>
      { loading && <Loading/> }
      <div className="utils-content">
      < HeadUtil configHeadUtil={configUtils} setSearchBy={setSearchBy} setQuery={setQuery}  filter={filter}  sendRequest={sendRequest} />
      </div>
      <div className="module-actions">
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

export default RegisterCart