import React, { useEffect, useState } from 'react';
import fetchAxios from '../../../axios/config';
import { GrClearOption } from 'react-icons/gr';

const SearchBrand = ({dataContent}) => {
  const [ list, setList] = useState([]);
  const [ query, setQuery] = useState(null);
  const [ selectData, setSelectData] = useState(null);
  const [ errors, setErros] = useState(null);

  const dispatchRequest = async () => {
    try {
      cleanOldData();

      const response = await fetchAxios.get('/brand', {headers:{query:query}});
      
      setList(response.data.rows);
      
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
    document.querySelector("#txtSearchBrand").value = "";
    setSelectData(null)
  }

  function setableDataList(item){
    setSelectData(item)
    setList([]);
  }

  return (
    <div className='SearchBc'>
      <span>Buscar marcas.</span>
      <div className="contentSearch">
        <div>
          <input 
            id='txtSearchBrand' 
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
        <input type="text" name="brand_name" disabled value={selectData ? selectData.brand_name : dataContent.brand_name} />
        <input type="hidden" name="fk_brand_id" value={selectData ? selectData.brand_id : null} />
      </div>

      <div className="SearchBcResult">
        <span className='Errors'>{errors}</span>
        <ul>
          {
              list.map( (element) => (
                <li 
                    key={element.brand_id} 
                    onClick={()=> setableDataList(element)}
                  > 
                  {element.brand_name} 
                </li> 
                ))
            }
        </ul>
      </div>
    </div>
  );
}

export default SearchBrand;
