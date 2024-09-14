import React, { useContext, useState } from 'react'
import { CartContext } from '../../../context/CartProvider'
import WrapperProgress from '../assets/WrapperProgress';
import ToolsApp from '../../assets/tools/ToolsApp';
import Loading from '../../loading/Loading';
import Pagination from '../../assets/paginate/Paginate';
import { TbCopyPlusFilled } from 'react-icons/tb';
import fetchAxios from '../../../axios/config';
import ManagerContext from '../../../context/ManagerContext';
const searchConfig = {options:[{value:'all',txt:'buscar Todos'},{value:'pendding',txt:'pendente'},{value:'approved',txt:'aprovado'}]}

function SelectCart() {
  const {clientData, setClientCart, setNavigate} = useContext(CartContext);
  const {pagination, setPagination} = useContext(ManagerContext);

  const [searchQuery, setSearchQuery] = useState({query: '', searchType: 'all'});
  const [dataResponse, setDataResponse] = useState([]);
  const [loading, setLoading] = useState(false)
  
  async function requestCartClient(){
    try {
      setLoading(true);
        
        const url = clientData ? '/cart/search/client' : '/cart/search/'

        const options = {
          state: searchQuery.query,
          client_id: clientData ? clientData.client_id : '',
        }

        const response = await fetchAxios.get(url, {headers:options});
        
        pagination.count = response.data.count;
        setPagination(pagination);
        setDataResponse(response.data.rows);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      window.alert(error);
    }
  }

  function handdlerSelection(data){
    setClientCart(data);
    setNavigate('third');
  };

  return (
    <div className='module-content'>
      {loading && <Loading/>}
      <div className="top-utils">
        <WrapperProgress first={'Buscar Cliente'} third={'Detalhes do carrinho'}  />
      </div>
      <div className="utils-content">
        <ToolsApp setQuerySearch={setSearchQuery} searchFunction={requestCartClient} searchConfig={searchConfig} />
      </div>
      <div className="module-actions">
        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>Id:</th>
                <th>Id client:</th>
                <th>Qtd produtos:</th>
                <th>Valor:</th>
                <th>Pagamento:</th>
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
                      <td>{item.cart_id}</td>
                      <td>{item.fk_client_id}</td>
                      <td>{item.qtd_products}</td>
                      <td>{item.amount}</td>
                      <td>{item.state}</td>
                      <td>
                        <button
                          className='bt-selection'
                          onClick={()=> handdlerSelection(item)}
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
        <Pagination sendRequest={requestCartClient}/>
      </div>
    </div>
  )
}

export default SelectCart