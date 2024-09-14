import React, { useContext, useState } from 'react'
import './SearchClients.css'
import SearchData from '../../assets/tools/SearchData';
import WrapperProgress from '../assets/WrapperProgress'
import DownloadData from '../../assets/tools/DownloadData';
import { CartContext } from '../../../context/CartProvider';
import fetchAxios from '../../../axios/config';
import Pagination from '../../assets/paginate/Paginate';
import ManagerContext from '../../../context/ManagerContext';
import Loading from '../../loading/Loading';
import { TbCopyPlusFilled } from 'react-icons/tb';
import ToolCreateClient from '../assets/ToolCreateClient';

const ToolsConfig = {options:[{value:'',txt:'buscar Todos'},{value:'instagram',txt:'instagram'}],};

function SearchClients() {
  const { setClientData , loading, setLoading, setNavigate} = useContext(CartContext);
  const { pagination } = useContext(ManagerContext);

  const [searchQuery, setQuerySearch] = useState({query:'', searchType:''});
  const [clientsData, setClientsData] = useState([]);
    
  async function searchClientsData() {
    try {
      setLoading(true);
      if(searchQuery.searchType === 'instagram' && searchQuery.query === ''){
         window.alert('ao consultar os clientes pelo seu id do instagram, deve ser inserido algum valor para a pesquisa!!!')
         setLoading(false)
      }else{
        let url = searchQuery.searchType ? `/client/search/${searchQuery.searchType}` : '/client/crud/read'
        
        let options = { 
          instagram:searchQuery.query,
          id:searchQuery.query,
          page:pagination.page, size:pagination.size, 
        }
  
        const response = await fetchAxios.get(url, {headers:options})
        setClientsData(response.data.rows);
        pagination.count =  response.data.count;
  
        setLoading(false);
      }

    } catch (error) {
      setLoading(false);
      console.log(error);
      window.alert(error);
    }
  }

  function handdlerSelectClient(client){
    setClientData(client);
    setNavigate("");
  }

  return (
    <div className='module-content'>
      { loading && <Loading/> } 
      <div className="top-utils">
        <WrapperProgress/>        
      </div>
      <div className="utils-content">
        <SearchData setQuerySearch={setQuerySearch} searchFunction={searchClientsData} searchConfig={ToolsConfig} />
        <ToolCreateClient updateClientList={searchClientsData} setLoading={setLoading} />
        <DownloadData/>
      </div>
      <div className="module-actions">

        <div className="content-table">
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Instagram</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Selecionar</th>
              </tr>
            </thead>
            <tbody>
              {
                clientsData.length > 0 && (
                  clientsData.map((item,index) => (
                    <tr key={`prodsc_${index+Math.random()}`}>
                      <td>{item.clientName}</td>
                      <td>{item.clientInstagram}</td>
                      <td>{item.telephone}</td>
                      <td>{item.email}</td>
                      <td>{item.telephone}</td>
                      <td>
                        <button 
                          className='bt-selection'
                          onClick={()=> handdlerSelectClient(item)}
                        ><TbCopyPlusFilled/></button>
                      </td>
                  </tr>
                  ))
                )
              }
            </tbody>
          </table>
        </div>

        <Pagination sendRequest={searchClientsData}/>
      </div>
    </div>
  )
}

export default SearchClients