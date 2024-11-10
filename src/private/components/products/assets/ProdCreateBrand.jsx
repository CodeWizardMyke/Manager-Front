import React, { useContext, useState } from 'react'
import './ProdCreateAttributes.css'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import fetchAxios from '../../../axios/config';
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdCreateBrand() {
  const {setLoading} = useContext(ProductCreateContext);

  const [ createOrAdd, setCreateOrAdd] = useState(false);
  const [ query, setQuery] = useState('');
  const [ categoryList, setCategoryList] = useState([]);
  const [ msgState, setMsgState] = useState('');

  function handdlerButton (){
    if(createOrAdd){
      createBrand();
    }else{
      searchBrand();
    };
  };

  const searchBrand = async () => {
    try {
      setLoading(true)

      const response = await fetchAxios.get('/brand', {headers:{query:query}})

      const arrLimited = response.data.rows.slice(0,5)
      setCategoryList(arrLimited)
      setLoading(false)
      
    } catch (error) {
      console.log('error', error);
      setLoading(false)
      alert('error',error.state);
    }
  }

  const createBrand = async () => {
    try {
      setLoading(true)
      setMsgState('');
      const body = {
        brand_name : query
      }

      const response = await fetchAxios.post('/brand', body )

      setLoading(false)
      setMsgState(response.data.msg)
    } catch (error) {
      setLoading(false)
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
              <select name='fk_brand_id'>
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