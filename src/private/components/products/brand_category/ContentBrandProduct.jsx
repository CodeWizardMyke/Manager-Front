import React, { useEffect, useState } from 'react';
import "./index.css"
import "./ContentBp.css"

import SearchBrand from './SearchBrand';
import CreateBrand from './CreateBrand';

const ContentBrandProduct = ({dataContent}) => {
  const [toggle, setToggle] = useState(true);
  const [brandName, setBrandName] = useState({brand_name:"Nada selecionado!"});

  useEffect(()=> {
    if(dataContent){
      setBrandName(dataContent.brandProduct);
    }
  },[dataContent])


  return (
    <div className='ContentBp'>
      {!toggle && <SearchBrand dataContent={brandName}/>}
      {toggle && <CreateBrand dataContent={brandName}/>}
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
