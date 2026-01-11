import React, { useEffect, useRef, useState } from 'react'

import { IoSearchCircleOutline } from "react-icons/io5";
import { GrClearOption } from "react-icons/gr";

import { MdAdd } from "react-icons/md";
import './insert_brand_categorys.css';

import Axios from '../../../axios/config';

function ProdCreateBrand({DataContent,clearFields = null, setClearFields}) {
  const fk_brand_id = DataContent ? DataContent.fk_brand_id : null;

  const [ create, setcreate] = useState(true);
  const [ reqResponse, setReqResponse] = useState('');
  const [ query, setQuery] = useState('Nenhuma marca Selecionada!');
  const [ itemId, setItemId] = useState(fk_brand_id);
  const [ attributeList, setAttributeList] = useState([]); // armazena a lista de atributos retornada pela api;

  const containerRef = useRef(null); // 🔹 referência principal

  useEffect(()=>{
    if(reqResponse !== ''){
      setTimeout(() => {
        setReqResponse('')
      }, 1000);
    }
  },[reqResponse])

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAttributeList([]); // fecha lista
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if(clearFields && clearFields !== null){
      setQuery('Nenhuma marca Selecionada!');
      setItemId(null);
      setAttributeList([]);
      setClearFields(false);
    }
  }, [clearFields,setClearFields]);

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
      document.querySelector('#inputSearchTextBrand').value = '';
    }
  }
  // implementação do useRef para detectar cliques fora do componente
  // adicionado no elemento pai do componente search_container ref={containerRef}
  // o useEffect adiciona um event listener para cliques fora do componente
  // quando um clique fora é detectado, a lista de atributos é fechada

  return (
    <div className='search_container' ref={containerRef}>
        <input type="text" className='hidden' name='fk_brand_id' value={itemId} readOnly />
        <input type="text" className='hidden' name='brand_name' value={query} readOnly />
        <div className="label_input">Gerenciador de marcas</div>
        <div className="valueSelectFeedback">
          <span> {query !== '' ? query : 'Campo vazio'}</span>
        </div>
        <div className='input_search'>
          <input type="text" id='inputSearchTextBrand'  placeholder={ create ? 'Criar nova marca.' : 'Buscar uma marca.' }defaultValue={''} onChange={ e => setQuery(e.target.value)} />
          <button type='button' className='btn_clear' onClick={() => clearInputSearch()} ><GrClearOption/></button>
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
            <button type='button' onClick={() => setcreate(false)}>
              <span>ir para painel de busca</span>
              <IoSearchCircleOutline/>
            </button>
            :
            <button type='button' onClick={() => setcreate(true)}>
              <span>ir para painel de criação</span>
              <MdAdd/>
              </button>
          }
        </div>
        <div className="SearchResult">
          <ul>
            {
              attributeList.map( (element) => (
                <li 
                    key={element.brand_id} 
                    onClick={() => handdlerSelectAttribute(element)} 
                  > 
                  {element.brand_name} 
                </li> 
                ))
            }
          </ul>
        </div>
    </div>
  )
}


export default ProdCreateBrand