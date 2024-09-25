import React, { useContext, useState } from 'react'
import ToolsApp from '../assets/tools/ToolsApp'
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';
import ManagerContext from '../../context/ManagerContext';
import fetchAxios from '../../axios/config';
import { TbCopyPlusFilled } from 'react-icons/tb';
import { ClientContext } from '../../context/ClientProvider';
const config = {options:[{value:'clientInstagram',txt:'instagram'},{value:'clientName',txt:'Nome cliente'}]}

function ClientSearch() {
  const [searchQuery,setSearchQuery] = useState({query: '', searchType: 'clientInstagram'});
  const [clientData, setClientData] = useState([]);
  const [loading,setLoading] = useState(false);
  const {pagination, setPagination} = useContext(ManagerContext);
  const {setClientSelect} = useContext(ClientContext);

  async function requestClientData() {
    try {
      setLoading(true);
      
      let url = '';
      if(searchQuery.searchType === 'clientInstagram') url = '/client/search/instagram'
      if(searchQuery.query === '') url = 'client/crud/read';
      if(searchQuery.searchType === 'clientName') window.alert('função ainda não implementada!')

      const options ={
        instagram:searchQuery.query,
        clientName:searchQuery.query
      }

      const response = await fetchAxios.get(url, {headers:options});
      
      pagination.count = response.data.cont;
      setClientData(response.data.rows);
      setPagination(pagination);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      window.alert("Erro inesperado", error.state);
    }
  }

  function handdlerClickShow(data) {
    setClientSelect(data);
  }

  return (
    <div className="module-content">
      {loading && <Loading />}
      <div className="top-utils">
        <div className="content-util"><h3>Manager Pesquisa de clientes</h3></div>
      </div>
      <div className="utils-content">
        <ToolsApp setQuerySearch={setSearchQuery} searchConfig={config} searchFunction={requestClientData}/>
      </div>
      <div className="module-actions">
        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Instagram</th>
                <th>Email</th>
                <th>Mostrar</th>
              </tr>
            </thead>
            <tbody>
              {
                clientData.length > 0 && (
                  clientData.map( (item, index)=> (
                    <tr
                    key={'clientData'+index}
                  >
                    <td>{item.client_id}</td>
                    <td>{item.clientName}</td>
                    <td>{item.clientInstagram}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        className='bt-selection'
                        onClick={ () => handdlerClickShow(item)}
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
        <Pagination sendRequest={requestClientData} />
      </div>
  </div>
  )
}

export default ClientSearch