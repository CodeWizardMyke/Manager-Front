import React, { useEffect, useState } from 'react'

import { IoSearchCircleOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import './ProdCreateAttributes.css'

import Axios from '../../axios/config';

function ProdCreateBrand() {
  const [create, setcreate] = useState(true);
  const [reqResponse, setReqResponse] = useState('');
  const [query, setQuery] = useState('');
  const [ itemId, setItemId] = useState('');
  const [ attributeList, setAttributeList] = useState([]); // armazena a lista de atributos retornada pela api;

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

      const response = await Axios.post('/brand', {brand_name:query})
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
      //if(query === ''){ return setReqResponse('Campo vazio') }
      const getData = await Axios.get('/brand', { headers : {query:query}} )
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
    setQuery(element.brand_name);
    setItemId(element.brand_id);
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
        <input type="text" className='hidden' name='brand_id' value={itemId} readOnly />
        <div className="label_input">Gerenciador de marcas</div>
        <div className="input_select">
          <input type="text"  placeholder={query!== "" ? query : "Nenhuma Marca..."}   disabled />
          {
            reqResponse !== '' && <span className="req_response">{reqResponse}</span>
          }
        </div>
        <div className='input_search'>
          <input type="text" placeholder={ create ? 'Criar Marca' : 'Buscar Marca' } onChange={ e => setQuery(e.target.value)} onClick={() => clearInputSearch()} />
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
              attributeList.map( (element) => (
                <li key={element.brand_id} onClick={() => handdlerSelectAttribute(element)} > {element.brand_name} </li> 
              ))
            }
          </ul>
        </div>
    </div>
  )
}


export default ProdCreateBrand