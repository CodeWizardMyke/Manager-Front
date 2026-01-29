import React, {  useState } from 'react';
import "./index.css"
import "./ContentBp.css"

import SearchCategory from './SearchCategory';
import CreateCategory from './CreateCategory';

const ContentCategoryProduct = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className='ContentBp'>
      {!toggle && <SearchCategory/>}
      {toggle && <CreateCategory/>}
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
