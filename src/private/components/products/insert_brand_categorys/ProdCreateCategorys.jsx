import React, { useEffect, useRef, useState } from 'react';

import { IoSearchCircleOutline } from "react-icons/io5";
import { MdAdd } from "react-icons/md";

import './insert_brand_categorys.css';

import Axios from '../../../axios/config';

function ProdCreateCategorys({DataContent}) {
  const category_id = DataContent ? DataContent.fk_category_id : null;
  const [create, setcreate] = useState(true);
  const [reqResponse, setReqResponse] = useState('');
  const [query, setQuery] = useState('Nenhuma categoria selecionada!');
  const [attributeList, setAttributeList] = useState([]); 
  const [itemId, setItemId] = useState(category_id);

  const containerRef = useRef(null); // 🔹 referência principal

  useEffect(() => {
    if (reqResponse !== '') {
      const timer = setTimeout(() => {
        setReqResponse('');
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [reqResponse]);

  // 🔹 Fecha a lista se clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAttributeList([]); // fecha lista
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const createAttribute = async () => {
    try {
      if (query === '') return setReqResponse('Campo vazio');

      const response = await Axios.post('/category', { category_name: query });
      if (response.status === 201) {
        setReqResponse('Criado com sucesso');
      } else {
        setReqResponse('Atribuído com sucesso');
        setQuery('');
      }
    } catch (error) {
      setReqResponse(error.response?.data?.msg || 'Erro ao criar');
      console.log('error', error);
    }
  };

  const searchAttribute = async () => {
    try {
      const getData = await Axios.get('/category', { headers: { query: query } });
      if (getData.status === 200) {
        setReqResponse('Encontrado com sucesso');
        const arrLimited = getData.data.rows;
        setAttributeList(arrLimited);
      } else {
        setReqResponse('Nada encontrado');
        setQuery('');
      }
    } catch (error) {
      setReqResponse('Erro ao buscar');
      setQuery('');
      console.log('error', error);
    }
  };

  function handdlerSelectAttribute(element) {
    setQuery(element.category_name);
    setItemId(element.category_id);
    setAttributeList([]);
  }

  function clearInputSearch() {
    if (query) {
      setQuery('');
      setItemId(null);
      setAttributeList([]);
    }
  }
    
  // implementação do useRef para detectar cliques fora do componente
  // adicionado no elemento pai do componente search_container ref={containerRef}
  // o useEffect adiciona um event listener para cliques fora do componente
  // quando um clique fora é detectado, a lista de atributos é fechada


  return (
    <div className='search_container' ref={containerRef}>
        <input type="text" className='hidden' name='category_name' value={query} readOnly />
        <input type="text" className='hidden' name='fk_category_id' value={itemId} readOnly />
      <div className="label_input">Gerenciador de Categorias</div>

      <div className="input_select">
        <input
          type="text"
          placeholder={DataContent ? `Categoria: ${DataContent.categoryProduct.category_name}` : query }
          disabled
        />
        {reqResponse !== '' && <span className="req_response">{reqResponse}</span>}
      </div>

      <div className='input_search'>
        <input
          type="text"
          placeholder={create ? 'Criar Categoria' : 'Buscar Categoria'}
          onChange={e => setQuery(e.target.value)}
          onClick={() => clearInputSearch()}
        />
        {create ? (
          <button type='button' className='btn_search' onClick={createAttribute}>
            <MdAdd />
          </button>
        ) : (
          <button type='button' className='btn_search' onClick={searchAttribute}>
            <IoSearchCircleOutline />
          </button>
        )}
      </div>

      <div className="create">
        {create ? (
          <button type='button' className='btn_create' onClick={() => setcreate(false)}>
            <IoSearchCircleOutline />
          </button>
        ) : (
          <button type='button' className='btn_create' onClick={() => setcreate(true)}>
            <MdAdd />
          </button>
        )}
      </div>

      {attributeList.length > 0 && (
        <div className="SearchResult">
          <ul>
            {attributeList.map((element) => (
              <li
                key={element.category_id}
                onClick={() => handdlerSelectAttribute(element)}
              >
                {element.category_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ProdCreateCategorys;
