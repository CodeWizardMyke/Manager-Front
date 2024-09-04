import React, { useCallback, useEffect, useState } from 'react'
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';
import fetchAxios from '../../axios/config';
import HeadUtil from '../assets/head_util/HeadUtil';
import { BiShowAlt } from "react-icons/bi";
import { FaCartPlus } from "react-icons/fa";

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

  const [ itemData, setItemData ] = useState(null);
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


  function addItemCart(){
    setItemData(null)
    alert('adicionado')
  }

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
                            <td>
                              <button onClick={()=>{setItemData(item)}}>
                                <BiShowAlt/>
                              </button>
                            </td>
                        </tr>
                        ))
                      )
                    }
                  </tbody>
              </table>
              {
                itemData && (
                  <div className="table-item-select">
                    <div className="table-item-select-header">
                      <h3>Adicionar ao carrinho!</h3>
                      <button 
                        className='bt bt-close'
                        onClick={()=>{setItemData(null)}}
                      >close</button>
                    </div>
                    <div className='cart-item-detail'>
                      <span className='cid-title'>Produto selecionado</span>
                      <div className='d-flex-r mt-5'>
                        <div className='wrapper-label'>
                          <label htmlFor="prod_name" >Nome</label>
                        </div>
                        <input type="text" id='prod_name' value={itemData.title} readOnly/>
                      </div>
                      <div className='d-flex-r mt-5'>
                        <div className='wrapper-label'>
                          <label htmlFor="prod_id">ID</label>
                        </div>
                        <input type="number" id="prod_id" value={itemData.product_id} readOnly/>
                      </div>
                    </div>
                    <div className="cart-inputs">
                      <div className='d-flex-r'>
                        <div className='wrapper-label'>
                          <label htmlFor="qtd">Quantidade</label>
                        </div>
                        <input type="number" id="qtd" min={1} className='w-10' max={ itemData.stock } />
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
            <Pagination setSize={setSize} setPage={setPage} count={count} size={size}  page={page} />
          </div>
    </div>
  )
}

export default RegisterCart