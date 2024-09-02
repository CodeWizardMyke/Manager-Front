import React from 'react'
import './Paginate.css'

function Pagination({setSize, setPage,count, page ,size}) {
  
  function paginatePrev() { if (page > 1) {setPage(page - 1);}}
  function paginateNext() { if (page < count / size) {setPage(page + 1);}}

  return (
    <div className='paginate'>
      <div className='paginate_btn'>
        <button type="button" className='wm-bn-prev' onClick={()=> paginatePrev()} >Anterior</button>
        <button type="button" className='wm-bt-next' onClick={() => paginateNext()}>Próximo</button>
      </div>
      <div className="paginate_size">
        <label htmlFor="size">QTD: </label>
        <select id="size" onChange={(e) => setSize(e.target.value)}>
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