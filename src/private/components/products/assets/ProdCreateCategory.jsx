import React, { useState } from 'react'
import './ProdCreateAttributes.css'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import fetchAxios from '../../../axios/config';

function ProdCreateCategory() {
  const [ createOrAdd, setCreateOrAdd] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [msgState,setMsgState] = useState('');

  function handdlerButton (){
    if(createOrAdd){
      createCategory();
    }else{
      searchCategory();
    };
  };

  const searchCategory = async () => {
    try {
      
      const options = {
        query:query
      }

      const response = await fetchAxios.get('/category', {headers:options})

      const arrLimited = response.data.rows.slice(0,5)
      setCategoryList(arrLimited)
      
    } catch (error) {
      console.log('error', error);
      alert('error',error.state);
    }
  }

  const createCategory = async () => {
    try {
      setMsgState('');
      const body = {
        category_name : query
      }

      const response = await fetchAxios.post('/category', body )

      setMsgState(response.data.msg)
    } catch (error) {
      console.log('error', error);
      window.alert('error', error.state)
    }
  }

  return (
   <>
    <div className='add_attribute'>
        <label htmlFor='search_category' > { createOrAdd ? 'Criar' : 'Buscar'} uma categoria</label>
        <div className='c_buttons'>
          <input type="text" id='search_category' onChange={(e) => {setQuery(e.target.value)}} />
          <button type='button' className='btn_search' onClick={handdlerButton} ><MdOutlineContentPasteSearch/></button>
        </div>
          {
            !createOrAdd && (
              <select name='fk_category_id' id='fk_category_id' >
               <option>Selecione a categoria</option>
                {
                  categoryList.map( (element) => {
                    return <option key={element.category_id} value={element.category_id} > {element.category_name} </option> 
                  })
                }
              </select>
            )
          }
          {
            createOrAdd && (<span> {msgState ? msgState : 'nova categoria '} </span> )
          }
        <button type='button' className='btn_create' onClick={() => setCreateOrAdd(!createOrAdd) } ><MdCreate/></button>
    </div>
  </>
  )
}

export default ProdCreateCategory