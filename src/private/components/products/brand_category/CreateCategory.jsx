import React, { useEffect, useState } from 'react';
import fetchAxios from '../../../axios/config';
import { GrClearOption } from 'react-icons/gr';

const CreateCategory = ({dataContent}) => {
  const [ list, setList] = useState([]);
  const [ query, setQuery] = useState(null);
  const [ selectData, setSelectData] = useState(null);
  const [ errors, setErros] = useState(null);

  const dispatchRequest = async () => {
    try {
      cleanOldData();

      const response = await fetchAxios.post('/category', {category_name:query});
      
      setList([response.data.data]);

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
    document.querySelector("#txtCreateCategory").value = "";
    setSelectData(null)
  }

  function setableDataList(item){
    setSelectData(item)
    setList([]);
  }

  return (
    <div className='SearchBc'>
      <span>Cadastrar categoria.</span>
      <div className="contentSearch">
        <div>
          <input 
            id='txtCreateCategory' 
            type="text"
            placeholder='Nome da categoria'
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
        <input type="text" name="category_name" disabled value={selectData ? selectData.category_name : dataContent.category_name} />
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

export default CreateCategory;
