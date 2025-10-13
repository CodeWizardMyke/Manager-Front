import React, { useContext, useEffect, useState } from 'react'
import './ProdCreateAttributes.css'
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { MdCreate } from "react-icons/md";
const fetchAxios = 'nager-Front-master/src/private/axios/config';

function ProdCreateCategory({data}) {
  const {setLoading} = useState(false);
  const [ createState, setcreateState] = useState(false);
  const [query, setQuery] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [msgState,setMsgState] = useState('');
  const [ dataCategory, setDataCategory] = useState(false);

  function handdlerButton (){
    if(createState){
      createCategory();
    }else{
      searchCategory();
    };
  };

  const searchCategory = async () => {
    try {
      setLoading(true);
      const options = {
        query:query
      }

      const response = await fetchAxios.get('/category', {headers:options})

      const arrLimited = response.data.rows.slice(0,5)
      setCategoryList(arrLimited)
      setLoading(false);
      setDataCategory(false)
      
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      alert('error',error.state);
    }
  }

  const createCategory = async () => {
      setLoading(true);
      try {
      setMsgState('');
      const body = {
        category_name : query
      }

      const response = await fetchAxios.post('/category', body )
      setDataCategory(false)
      setMsgState(response.data.msg)
      setLoading(false);
      
    } catch (error) {
      const {response} = error
      if(response && response.data && response.data.msg){
        window.alert('Error' , ": " , error.response.status ,  '\n' , response.data.msg)
        console.log(error);
      }else{
        window.alert('Error inesperado ocorreu! ' ,'\n' , error.response.status0)
      }
      setLoading(false)
    }
  }

  useEffect(() => {
    if(data && data.Category){
      setDataCategory(true);
    };
  }, [data,setDataCategory])

  return (
   <>
    <div className='add_attribute'>
        <label htmlFor='search_category' > { createState ? 'Criar' : 'Buscar'} uma categoria</label>
        <div className='c_buttons'>
          <input type="text" id='search_category' onChange={(e) => {setQuery(e.target.value)}} />
          <button type='button' className='btn_search' onClick={handdlerButton} ><MdOutlineContentPasteSearch/></button>
        </div>
          {
            !createState && (
              <select name='fk_category_id' id='fk_category_id' >
                { dataCategory ? <option value={data.Category.category_id} >{data.Category.category_name}</option>  : <option>Selecione a categoria</option>}
                {
                  categoryList.map( (element) => {
                    return <option key={element.category_id} value={element.category_id} > {element.category_name} </option> 
                  })
                }
              </select>
            )
          }
          {
            createState && (<span> {msgState ? msgState : 'nova categoria '} </span> )
          }
        <button type='button' className='btn_create' onClick={() => setcreateState(!createState) } ><MdCreate/></button>
    </div>
  </>
  )
}

export default ProdCreateCategory