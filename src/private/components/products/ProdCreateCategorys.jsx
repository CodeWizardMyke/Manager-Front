import React, { useEffect, useState } from 'react'

import { IoSearchCircleOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import './ProdCreateAttributes.css'

import Axios from '../../axios/config';

function ProdCreateCategorys() {
  const [create, setcreate] = useState(true);
  const [reqResponse, setReqResponse] = useState('');
  const [query, setQuery] = useState('');
  const [ attributeList, setAttributeList] = useState([]); // armazena a lista de atributos retornada pela api;
  const [ itemId, setItemId] = useState(null);

  useEffect(()=>{
    if(reqResponse !== ''){
      setTimeout(() => {
        setReqResponse('')
      }, 1000);
    }
  },[reqResponse])

  const createAttribute = async () => {
    try {
      if(query === ''){ return setReqResponse('Campo vazio') }

      const response = await Axios.post('/category', {category_name:query})
      if (response.status === 201){
        setReqResponse('Criado com sucesso')
      }else{
        setReqResponse('Atribuido com sucesso' )
        setQuery('')
      }
      console.log('getData Create', response)

    } catch (error) {
      setReqResponse(error.response.data.msg);
      console.log('error', error);
    }
  }

  const searchAttribute = async () => {
    try {
     // if(query === ''){ return setReqResponse('Campo vazio') }
      const getData = await Axios.get('/category', { headers : {query:query}} )
      console.log('getData', getData)
      if (getData.status === 200){
        setReqResponse('Encontrado com sucesso')
        const arrLimited = getData.data.rows
        setAttributeList(arrLimited)
      }else{
        setReqResponse('Nada encontrado')
        setQuery('');
      }
    } catch (error) {
      setReqResponse('Erro ao criar/atribuir');
      setQuery('');
      console.log('error', error);
    }
  }

  function handdlerSelectAttribute(element){
    setQuery(element)
    setItemId(element.category_id)
    setAttributeList([])
  }

  function clearInputSearch() {
    if(query){
      setQuery('');
      setItemId(null);
      setAttributeList([]);
    }
  }

  return (
    <div className='search_container'>
        <input type="text" className='hidden' name='category_id' value={itemId} />
        <div className="label_input">Gerenciador de Categorias</div>
        <div className="input_select">
          <input type="text" placeholder={query!== "" ? query.category_name : "Nenhuma categoria..."}   disabled />
          {
            reqResponse !== '' && <span className="req_response">{reqResponse}</span>
          }
        </div>
        <div className='input_search'>
          <input type="text" placeholder={ create ? 'Criar Categoria' : 'Buscar Categoria' } onChange={ e => setQuery(e.target.value)} onClick={() => clearInputSearch()} />
          {
            create ? 
            <button type='button' className='btn_search' onClick={() => createAttribute()} ><MdAdd/></button>
            :
            <button type='button' className='btn_search' onClick={() => searchAttribute()} ><IoSearchCircleOutline/></button>
          }
        </div>
        <div className="create">
          {
            create ? 
            <button type='button' className='btn_create' onClick={() => setcreate(false)}><IoSearchCircleOutline/></button>
            :
            <button type='button' className='btn_create' onClick={() => setcreate(true)}><MdAdd/></button>
          }
        </div>
        <div className="SearchResult">
          <ul>
            {
              attributeList.map( (element) => {
                return <li key={element.category_id} onClick={() => handdlerSelectAttribute(element)} > {element.category_name} </li> 
              })
            }
          </ul>
        </div>
    </div>
  )
}


export default ProdCreateCategorys