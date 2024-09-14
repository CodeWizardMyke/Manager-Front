import React, { useContext, useState } from 'react'
import WrapperProgress from '../assets/WrapperProgress'
import ToolsApp from '../../assets/tools/ToolsApp'
import Pagination from '../../assets/paginate/Paginate';
import Loading from '../../loading/Loading';
import fetchAxios from '../../../axios/config';
import ManagerContext from '../../../context/ManagerContext';
import { TbCopyPlusFilled } from 'react-icons/tb';
import { CartContext } from '../../../context/CartProvider';
const searchConfig = {options:[{value:'',txt:'buscar Todos'},{value:'instagram',txt:'Instagram'}]}

function SearchClient() {
  const [searchQuery, setSearchQuery] = useState({query: '', searchType: ''});
  const [loading, setLoading] = useState(false);
  const [ dataResponse, setDataResponse ] = useState([]);

  const {pagination,setPagination} = useContext(ManagerContext);
  const {setClientData, setNavigate} = useContext(CartContext);

  async function requireClient() {
    try {
      setLoading(true);

      if(searchQuery.searchType === 'instagram' && searchQuery.query === ''){
        window.alert('ao consultar os clientes pelo seu id do instagram, deve ser inserido algum valor para a pesquisa!!!')
        setLoading(false)
     }else{

       const url = searchQuery.searchType !== '' ? `/client/search/${searchQuery.searchType}` : '/client/crud/read';
 
       console.log(searchQuery)
       const options = {
         page: pagination.page,
         size:pagination.size,
         instagram:searchQuery.query,
         id:searchQuery.query
       };
 
       const response = await fetchAxios.get(url,{headers:options});
 
       setDataResponse(response.data.rows);
       pagination.count = response.data.count;
       setPagination(pagination);
       setLoading(false);
     }
    } catch (error) {
      console.log(error);
      window.alert(error);
      setLoading(false);
    };
  };

  function handdlerSelectClient(data) {
    setClientData(data);
    setNavigate('secound');
  }

  return (
    <div className='module-content'>
      {loading && <Loading/>}
      <div className="top-utils">
        <WrapperProgress first={'Buscar Cliente'} third={'Detalhes do carrinho'} />
      </div>
      <div className="utils-content">
        <ToolsApp setQuerySearch={setSearchQuery} searchFunction={requireClient} searchConfig={searchConfig} />
      </div>
      <div className="module-actions">
       <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>Id:</th>
                <th>Nome:</th>
                <th>Instagram:</th>
                <th>Email:</th>
                <th>Telefone:</th>
                <th>Selecionar:</th>
              </tr>
            </thead>
            <tbody>
              {
                dataResponse.length > 0 && (
                  dataResponse.map((item,index) => (
                    <tr
                      key={'cartManagerClientSearch'+index}
                    >
                      <td>{item.client_id}</td>
                      <td>{item.clientName}</td>
                      <td>{item.clientInstagram}</td>
                      <td>{item.email}</td>
                      <td>{item.telephone}</td>
                      <td>
                        <button
                          className='bt-selection'
                          onClick={()=> handdlerSelectClient(item)}
                        >
                          <TbCopyPlusFilled/>
                        </button>
                      </td>
                    </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>
        <Pagination sendRequest={requireClient} />
      </div>
    </div>
  )
}

export default SearchClient


