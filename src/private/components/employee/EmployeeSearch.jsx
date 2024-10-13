import React, { useContext, useState } from 'react'
import ToolsApp from '../assets/tools/ToolsApp'
import Pagination from '../assets/paginate/Paginate';
import Loading from '../loading/Loading';

import { TbCopyPlusFilled } from 'react-icons/tb';
import fetchAxios from '../../axios/config';
import ManagerContext from '../../context/ManagerContext';
import EmployeeView from './EmployeeView';
const config = {options:[{value:'name',txt:'Nome funcionário'},{value:'email',txt:'Email'}]}

function EmployeeSearch() {
  const  {pagination, setPagination } =   useContext(ManagerContext);

  const [ searchQuery, setSearchQuery ] = useState({query: '', searchType: 'name'});
  const [ emploData, setEmploData ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ emploView, setEmploView ] = useState(null)

  async function request() {
    try {
      setLoading(true);

      let url = `/employee/search/${ searchQuery.searchType === 'name' ? 'name' : 'email' }`;
      if(searchQuery.query === ''){
        url = '/employee/crud/read'
      }

      const options = {
        query:searchQuery.query
      }

      const response = await fetchAxios.get(url, {headers:options})
      setEmploData(response.data.rows)
      pagination.count = response.data.cont;
      setPagination(pagination);
    
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('error', error);
      window.alert("Error inesperado!", error.state);
    }
  }

  function handdlerClickShow(data) {
    setEmploView(data)
  }

  return (
    <>
      {
        emploView && <EmployeeView data={emploView} setData={setEmploView} />
      }
      {
        !emploView && (
          <div className="module-content">
            {loading && <Loading />}
            <div className="top-utils">
              <div className="content-util"><h3>Pesquisa de Funcionários</h3></div>
            </div>
            <div className="utils-content">
              <ToolsApp setQuerySearch={setSearchQuery} searchConfig={config} searchFunction={request}/>
            </div>
            <div className="module-actions">
              <div className="content-table">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Cargo</th>
                      <th>Email</th>
                      <th>Mostrar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      emploData.length > 0 && (
                        emploData.map( (item, index)=> (
                          <tr
                          key={'clientData'+index}
                        >
                          <td>{item.employee_id}</td>
                          <td>{item.name}</td>
                          <td>{item.role}</td>
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
              <Pagination sendRequest={request} />
            </div>
          </div>
        )
      }
    </>
  )
}

export default EmployeeSearch