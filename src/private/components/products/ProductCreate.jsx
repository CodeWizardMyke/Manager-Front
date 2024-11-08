import React, { useContext, useState } from 'react'
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';

import './ProductCreate.css'
import ProdThumbnails from './assets/ProdThumbnails';
import ProdMovie from './assets/ProdMovie,';
import ProdFieldsLeft from './assets/ProdFieldsLeft';
import ProdFieldRigth from './assets/ProdFieldRigth';
import ProductCreateContext from '../../context/ProductCreateContext';

function ProductCreate({prodItemData, setProdItemData}) {
  const {loading, setLoading, thumbnails, advertisings, unformatPrice} = useContext(ProductCreateContext);
  
  async function handdlerForm(event){
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.target);
    
    formData.set('thumbnails',thumbnails);
    formData.set('advertisings',advertisings);
    
    let costPriceUnFormat = unformatPrice(formData.get('product_cost'))
    formData.set('product_cost', costPriceUnFormat);

    try {

      await fetchAxios.post('product/crud/create',formData,{headers:{'Content-Type':'multipart/form-data'}});
      
      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className='module-content'>
      { loading && <Loading/> }
      <form 
        onSubmit={handdlerForm}
      >
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
      </form>
    </div>
  )
}

export default ProductCreate