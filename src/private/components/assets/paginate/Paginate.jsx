import React, { useContext } from 'react'
import './Paginate.css'
import ManagerContext from '../../../context/ManagerContext';

function Pagination({sendRequest }) {
  const {pagination, setPagination} = useContext(ManagerContext);
  
  function paginatePrev() {
    if(pagination.page > 1){
      pagination.page --;
      setPagination(pagination);
      sendRequest();
    }
  }
  function paginateNext() {
    if(pagination.page < (pagination.count / pagination.size)){
      pagination.page ++;
      setPagination(pagination);
      sendRequest();
    }
  }

  function handdlerSize (e){
    pagination.size = e.target.value;
    setPagination(pagination);
    sendRequest();
  }

  return (
    <div className='paginate'>
      <div className='paginate_btn'>
        <button type="button" className='wm-bn-prev' onClick={()=> paginatePrev()} >Anterior</button>
        <button type="button" className='wm-bt-next' onClick={() => paginateNext()}>Próximo</button>
      </div>
      <div className="paginate_size">
        <label htmlFor="size">QTD: </label>
        <select id="size" onChange={(e) => handdlerSize(e)}>
          <option value="15">15</option>
          <option value="40">40</option>
          <option value="80">80</option>
          <option value="100">100</option>
        </select>
      </div>
      </div>
  )
}

export default Pagination