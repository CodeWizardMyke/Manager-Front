import React, { useEffect, useState } from 'react';
import fetchAxios from '../../../axios/config';
import { GrClearOption } from 'react-icons/gr';

const CreateBrand = () => {
  const [ list, setList] = useState([]);
  const [ query, setQuery] = useState(null);
  const [ selectData, setSelectData] = useState(null);
  const [ errors, setErros] = useState(null);

  const dispatchRequest = async () => {
    try {
      cleanOldData();

      const response = await fetchAxios.post('/brand', {brand_name:query});
      
      setList([response.data.data]);
      setErros(response.msg)

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
    setSelectData(null)
    document.querySelector("#textField").value = "";
  }

  function setableDataList(item){
    setSelectData(item)
    setList([]);
  }

  return (
    <div className='SearchBc'>
      <span>Cadastro de marcas.</span>
      <div className="contentSearch">
        <div>
          <input 
            id='textField'
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
        >Cadastrar</button>
      </div>

      <div className="selectData">
        <input type="text" name="brand_name" disabled value={selectData ? selectData.brand_name : "Nada selecionado!"} />
        <input type="hidden" name="brand_id" value={selectData ? selectData.brand_id : null} />
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

export default CreateBrand;
