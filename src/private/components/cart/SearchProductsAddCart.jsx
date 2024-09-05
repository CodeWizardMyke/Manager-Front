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

function SearchProductsAddCart({dataCart, setDataCart, navigate, setNavigate}) {
  const [ pagination, setPagination ]  = useState({size:15,page:0,count:1})
  const [ loading, setLoading ] = useState(false);

  const [ itemData, setItemData ] = useState(null);
  const [ data, setData ]= useState([]);
  const [ searchBy, setSearchBy ] = useState("");
  const [ query, setQuery ] = useState("");
  const [ qtdProducts, setQtdProducs ] = useState(1);

  let filter = searchBy;

  const sendRequest = useCallback( async () => {
    try {
      setLoading(true);

      let url = `/product/${query ? 'search/title' : 'crud/read'}`
      let options = {
        page:pagination.page,
        size:pagination.size,
        title:query,
      }

      const response = await fetchAxios.get(url, {headers:options});
      setData(response.data.rows);
      
      pagination.count =  response.data.count;
      setPagination(pagination);

      setLoading(false);

    } catch (error) {
      setLoading(false);
      window.alert(error);
      console.log(error);
    }
  }, [pagination])

  function addItemCart(){
    itemData.qtd_products = qtdProducts;

    if(data.length > 0){

      let newArr = data.map( (item) => {
        if(item.product_id === itemData.product_id){
          item.stock -= qtdProducts
        }
        return item
      })

      setData(newArr)
    }

    setDataCart([...dataCart, itemData])
    setItemData(null)
  }

  return (
    <div className='module-content'>
      { loading && <Loading/> }
      <div className="top-utils">
        <div className="wrapper-progreess">
          <div className={`wp-item products_search ${navigate === 'products' ? 'wp-active' : '' }`}>
            <button>Buscar Produtos</button>
          </div>
          <div className="wp-item cart_selection">
            <button>Selecionar Carrinho</button>
          </div>
          <div className="wp-item client_search">
            <button>Buscar Cliente</button>
          </div>
        </div>
      </div>
      <div className="utils-content">
        <HeadUtil configHeadUtil={configUtils} setSearchBy={setSearchBy} setQuery={setQuery}  filter={filter}  sendRequest={sendRequest} />
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
                      <th>Carrinho</th>
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
                              <button className='bt-show-Prod'>
                                <BiShowAlt/>
                              </button>
                            </td>
                            <td>
                              <button onClick={()=>{setItemData(item)}} className='bt-cartAdd'>
                                <FaCartPlus/>
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
                        <input type="number" id="qtd" min={1} className='w-10' max={ itemData.stock } onChange={(e)=> setQtdProducs(e.target.value) } />
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
            <Pagination  pagination={pagination} setPagination={setPagination} sendRequest={sendRequest} />
          </div>
    </div>
  )
}

export default SearchProductsAddCart;