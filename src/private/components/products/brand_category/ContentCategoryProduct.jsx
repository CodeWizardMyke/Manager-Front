import React, {  useEffect, useState } from 'react';
import "./index.css"
import "./ContentBp.css"

import SearchCategory from './SearchCategory';
import CreateCategory from './CreateCategory';

const ContentCategoryProduct = ({dataContent}) => {
  const [toggle, setToggle] = useState(true);
  const [categoryName, setCategoryName] = useState({category_name:"Nada selecionado!"});

  useEffect(()=> {
    if(dataContent){
      setCategoryName(dataContent.categoryProduct);
    }
  },[dataContent])

  return (
    <div className='ContentBp'>
      {!toggle && <SearchCategory dataContent={categoryName}/>}
      {toggle && <CreateCategory dataContent={categoryName}/>}

      <div className="wrapperButtonsCbp">
        <button 
          type='button' 
          className= { ` bts-search ${!toggle && 'colorR'} ` }
          onClick={()=> setToggle(false)}
        >Painel Busca
        </button>
        <button 
          type='button'
          className= { ` bts-create ${toggle && 'colorR'} ` }
          onClick={()=> setToggle(true)} 
        >Painel Cadastro</button>
      </div>
    </div>
  );
}

export default ContentCategoryProduct;
