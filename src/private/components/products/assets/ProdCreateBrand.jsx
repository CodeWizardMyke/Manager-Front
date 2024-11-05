import React, { useState } from 'react'
import './ProdCreateAttributes.css'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import fetchAxios from '../../../axios/config';

function ProdCreateBrand() {
  const [ createOrAdd, setCreateOrAdd] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [msgState,setMsgState] = useState('');

  function handdlerButton (){
    if(createOrAdd){
      createBrand();
    }else{
      searchBrand();
    };
  };

  const searchBrand = async () => {
    try {
      
      const options = {
        query:query
      }

      const response = await fetchAxios.get('/brand', {headers:options})

      const arrLimited = response.data.rows.slice(0,5)
      setCategoryList(arrLimited)
      
    } catch (error) {
      console.log('error', error);
      alert('error',error.state);
    }
  }

  const createBrand = async () => {
    try {
      setMsgState('');
      const body = {
        brand_name : query
      }

      const response = await fetchAxios.post('/brand', body )

      setMsgState(response.data.msg)
    } catch (error) {
      console.log('error', error);
      window.alert('error', error.state)
    }
  }

  return (
   <>
    <div className='add_attribute'>
        <label htmlFor='search_brand' > { createOrAdd ? 'Criar' : 'Buscar'} uma Marca</label>
        <div className='c_buttons'>
          <input type="text" id='search_brand' onChange={(e) => {setQuery(e.target.value)}} />
          <button type='button' className='btn_search' onClick={handdlerButton} ><MdOutlineContentPasteSearch/></button>
        </div>
          {
            !createOrAdd && (
              <select name='fk_id_brand' id='fk_id_brand' >
               <option>Selecione a Marca</option>
                {
                  categoryList.map( (element) => {
                    return <option key={element.brand_id} value={element.brand_id} > {element.brand_name} </option> 
                  })
                }
              </select>
            )
          }
          {
            createOrAdd && (<span> {msgState ? msgState : 'nova marca '} </span> )
          }
        <button type='button' className='btn_create' onClick={() => setCreateOrAdd(!createOrAdd) } ><MdCreate/></button>
    </div>
  </>
  )
}

export default ProdCreateBrand