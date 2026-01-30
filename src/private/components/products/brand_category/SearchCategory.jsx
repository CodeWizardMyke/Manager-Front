import React, { useEffect, useState } from 'react';
import fetchAxios from '../../../axios/config';
import { GrClearOption } from 'react-icons/gr';

const SearchCategory = ({dataContent}) => {
  const [ list, setList] = useState([]);
  const [ query, setQuery] = useState(null);
  const [ selectData, setSelectData] = useState(null);
  const [ errors, setErros] = useState(null);

  const dispatchRequest = async () => {
    try {
      cleanOldData();

      const response = await fetchAxios.get('/category', {headers:{query:query}});
      
      setList(response.data.rows);
      if(response.data.count < 1){
        setErros("Não há nenhum dado cadastrado!")
      }

    } catch (error) {
      setErros('Erro de solocitação!')
      console.log(error);
    }
  }

  useEffect(() => {
    if(errors !== null){ setTimeout(()=>{ setErros(null) }, 2000) }
  }, [errors, setErros]);

  function handdlerSubmit(){
    if(query !== null){
      dispatchRequest();
    }else{
      setErros('Insira um valor antes de inciar a busca..')
    }
  }

  function cleanOldData(){
    setErros(null);
    setList([]);
    setSelectData(null);
  };

  function cleanInputText(){
    setQuery(null);
    setList([]);
    document.querySelector("#txtSearchCategory").value = "";
    setSelectData(null)
  }

  function setableDataList(item){
    setSelectData(item)
    setList([]);
  }

  return (
    <div className='SearchBc'>
      <span>Buscar categoria.</span>
      <div className="contentSearch">
        <div>
          <input 
            id='txtSearchCategory' 
            type="text"
            placeholder='Campo de busca...'
            onChange={(e)=> setQuery(e.target.value)} 
            onClick={cleanInputText}
          />
          <button className='cleanBt' type='button' onClick={cleanInputText}><GrClearOption/></button>
        </div>

        <button 
          type='button'
          onClick={handdlerSubmit}
          className='submtBt'
        >Buscar</button>
      </div>

      <div className="selectData">
        <input type="text" name="category_name" disabled value={selectData ? selectData.category_name : dataContent.category_name } />
        <input type="hidden" name="fk_category_id" value={selectData ? selectData.category_id : null} />
      </div>

      <div className="SearchBcResult">
        <span className='Errors'>{errors}</span>
        <ul>
          {
              list.map( (element) => (
                <li 
                    key={element.category_id} 
                    onClick={()=> setableDataList(element)}
                  > 
                  {element.category_name} 
                </li> 
                ))
            }
        </ul>
      </div>
    </div>
  );
}

export default SearchCategory;
