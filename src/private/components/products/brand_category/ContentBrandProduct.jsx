import React, { useState } from 'react';
import "./index.css"
import "./ContentBp.css"

import SearchBrand from './SearchBrand';
import CreateBrand from './CreateBrand';

const ContentBrandProduct = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className='ContentBp'>
      {!toggle && <SearchBrand/>}
      {toggle && <CreateBrand/>}
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

export default ContentBrandProduct;
