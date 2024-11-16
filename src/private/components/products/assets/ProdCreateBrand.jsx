import React, { useContext, useEffect, useState } from 'react'
import './ProdCreateAttributes.css'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdCreate } from "react-icons/md";
import fetchAxios from '../../../axios/config';
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdCreateBrand({data}) {
  const {setLoading} = useContext(ProductCreateContext);
  const [ createOrAdd, setCreateOrAdd] = useState(false);
  const [ query, setQuery] = useState('');
  const [ categoryList, setCategoryList] = useState([]);
  const [ msgState, setMsgState] = useState('');
  const [ dataBrand, setDataBrand] = useState(false)

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
      setDataBrand(false);
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
      setDataBrand(false);
      setMsgState(response.data.msg)
    } catch (error) {
      const {response} = error
      if(response && response.data && response.data.msg){
        window.alert('Error' , ": " , error.response.status ,  '\n' +  response.data.msg)
        console.log(error);
      }else{
        window.alert('Error inesperado ocorreu! ' , '\n' , error.response.status0)
      }
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(data && data.Brand){
      setDataBrand(true)
    }
  },[data,setDataBrand])


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
              <select name='fk_brand_id' id='fk_brand_id' >
                {
                  dataBrand ? <option value={data.Brand.brand_id} >{data.Brand.brand_name}</option> : <option>Selecione a Marca</option>
                }
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