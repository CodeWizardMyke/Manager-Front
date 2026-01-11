import React, { useEffect, useRef, useState } from 'react';

import { IoSearchCircleOutline } from "react-icons/io5";
import { GrClearOption } from "react-icons/gr";
import { MdAdd } from "react-icons/md";

import './insert_brand_categorys.css';
import Axios from '../../../axios/config';

function ProdCreateCategorys({ DataContent, clearFields = null, setClearFields }) {
  const fk_category_id = DataContent ? DataContent.fk_category_id : null;

  const [create, setCreate] = useState(true);
  const [reqResponse, setReqResponse] = useState('');
  const [query, setQuery] = useState('Nenhuma categoria Selecionada!');
  const [itemId, setItemId] = useState(fk_category_id);
  const [attributeList, setAttributeList] = useState([]);

  const containerRef = useRef(null);

  useEffect(() => {
    if (reqResponse !== '') {
      const timer = setTimeout(() => setReqResponse(''), 1000);
      return () => clearTimeout(timer);
    }
  }, [reqResponse]);

  // 🔹 Fecha lista ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setAttributeList([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (clearFields) {
      setQuery('Nenhuma categoria Selecionada!');
      setItemId(null);
      setAttributeList([]);
      setClearFields(false);
    }
  }, [clearFields, setClearFields]);

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
      console.log(error);
    }
  };

  const searchAttribute = async () => {
    try {
      const getData = await Axios.get('/category', {
        headers: { query }
      });

      if (getData.status === 200) {
        setReqResponse('Encontrado com sucesso');
        setAttributeList(getData.data.rows);
      } else {
        setReqResponse('Nada encontrado');
        setQuery('');
      }
    } catch (error) {
      setReqResponse('Erro ao buscar');
      setQuery('');
      console.log(error);
    }
  };

  function handlerSelectAttribute(element) {
    setQuery(element.category_name);
    setItemId(element.category_id);
    setAttributeList([]);
  }

  function clearInputSearch() {
    if (query) {
      setQuery('');
      setItemId(null);
      setAttributeList([]);
      document.querySelector('#inputSearchTextCategory').value = '';
    }
  }

  return (
    <div className="search_container" ref={containerRef}>
      <input type="text" className="hidden" name="fk_category_id" value={itemId || ''} readOnly />
      <input type="text" className="hidden" name="category_name" value={query} readOnly />

      <div className="label_input">Gerenciador de Categorias</div>

      <div className="valueSelectFeedback">
        <span>{query !== '' ? query : 'Campo vazio'}</span>
      </div>

      <div className="input_search">
        <input
          type="text"
          id="inputSearchTextCategory"
          placeholder={create ? 'Criar nova categoria.' : 'Buscar categoria.'}
          defaultValue=""
          onChange={e => setQuery(e.target.value)}
        />

        <button type="button" className="btn_clear" onClick={clearInputSearch}>
          <GrClearOption />
        </button>

        {create ? (
          <button type="button" className="btn_search" onClick={createAttribute}>
            <MdAdd />
          </button>
        ) : (
          <button type="button" className="btn_search" onClick={searchAttribute}>
            <IoSearchCircleOutline />
          </button>
        )}
      </div>

      <div className="create">
         {
            create ? 
            <button type='button' onClick={() => setCreate(false)}>
              <span>ir para painel de busca</span>
              <IoSearchCircleOutline/>
            </button>
            :
            <button type='button' onClick={() => setCreate(true)}>
              <span>ir para painel de criação</span>
              <MdAdd/>
              </button>
          }
      </div>

      <div className="SearchResult">
        <ul>
          {attributeList.map(element => (
            <li
              key={element.category_id}
              onClick={() => handlerSelectAttribute(element)}
            >
              {element.category_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ProdCreateCategorys;
