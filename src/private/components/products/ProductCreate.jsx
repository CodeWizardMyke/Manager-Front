import React, { useEffect, useState } from 'react'
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';

import './ProductCreate.css'
import ProdThumbnails from './assets/ProdThumbnails';
import ProdMovie from './assets/ProdMovie,';
import ProdFieldsLeft from './assets/ProdFieldsLeft';
import ProdFieldRigth from './assets/ProdFieldRigth';
import ProductCreateProvider from '../../context/ProductCreateProvider';

function ProductCreate({prodItemData, setProdItemData}) {
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false)

console.log('handdlerForm', handdlerForm)

  async function handdlerForm(event){
    event.preventDefault();
    setLoading(true);
    updateErrors()
    try {
      const formData = new FormData(event.target);

      if(prodItemData){
        await fetchAxios.put('product/crud/update',formData,{headers:{'Content-Type':'multipart/form-data',product_id:prodItemData.product_id,}});
        setPopup(true)
        setLoading(false);
      }else{
        await fetchAxios.post('product/crud/create',formData,{headers:{'Content-Type':'multipart/form-data'}});
        setPopup(true)
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      if(error.response){
        setErrors(error.response.data.errors);
      };
    }
  }

  useEffect( () => {
    if(errors.length > 0){
      errors.map( (e) => document.querySelector(`.errors-${e.path}`).innerHTML = e.msg );
    };
  }, [errors])

  useEffect(()=>{
    if(popup){
      setTimeout(() => {
        setPopup(false)
      }, 2000);
    }

  },[popup])

  function updateErrors(){
    if(errors.length > 0){
     errors.map( (e) =>  document.querySelector(`.errors-${e.path}`).innerHTML = '' );
    };
    setErrors([])
  };

  return (
    <ProductCreateProvider>
      <div className='module-content'>
        { loading && <Loading/> }
        <div className="wrapper-manager_prod">
          <div className="content_text_module-action"><span>Cadastrio de novos produtos</span></div>
            <div className="manager_prod_top">
              <ProdThumbnails/>
              <ProdMovie/>
            </div>
            <div className="manager_prod_bottom">
              <ProdFieldsLeft/>
              <ProdFieldRigth/>
            </div>
        </div>
      </div>
    </ProductCreateProvider>
  )
}

export default ProductCreate