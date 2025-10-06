import React, { useContext, useEffect, useState } from 'react'
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';

import './ProductCreate.css'
import ProdMovie from './assets/ProdMovie,';
import ProdFieldsLeft from './assets/ProdFieldsLeft';
import ProdFieldRigth from './assets/ProdFieldRigth';
import ProductCreateContext from '../../context/ProductCreateContext';
import { useCallback } from 'react';
import ImagesLayout from './fragments/images_layout/ImagesLayout';

function ProductCreate() {
  
  const {loading, setLoading,thumbnails, setThumbnails, setAdvertisings,setMovieURL, advertisings, unformatPrice} = useContext(ProductCreateContext);
  const [messageState, setMessageState ] = useState('');
  const [oldErrors,setOldErrors] = useState([])

  const cleaningData = useCallback( (event) => {
    setAdvertisings([])
    setThumbnails([])
    setMovieURL('');
    if(event){
      event.target.reset();
    }
  },[setAdvertisings,setThumbnails,setMovieURL] )

  useEffect( ()=> cleaningData() ,[cleaningData] )

  async function handdlerForm(event){
    setLoading(true);
    event.preventDefault();
    
    const formData = new FormData(event.target);
    let arrImages = [...thumbnails, ...advertisings]
    formData.set('thumbnail_length', thumbnails.length);
    formData.set('advertising_length', advertisings.length);

    arrImages.forEach((file) => { formData.append('thumbnails', file) });
    formData.set('product_cost',  unformatPrice(formData.get('product_cost')));

    try {
      await fetchAxios.post('product/crud/create',formData,{headers:{'Content-Type':'multipart/form-data'}});
      setLoading(false);

      cleaningData(event);
      messageFeedbackState('Cadastrado com sucesso!','sucess_created' );
    } catch (error) {
      console.log('error', error)
      functionProductFailure(error)
      setLoading(false);
    }
  }



  function functionProductFailure(error){
    let data = error.response.data;
    
    if(oldErrors.length > 0) oldErrors.map( element => document.querySelector(`#${element.path}`).classList.remove('field_error') );

    if(data.errors.length > 0) data.errors.map( element => document.querySelector(`#${element.path}`).classList.add('field_error') );
    
    setOldErrors(data.errors);
    messageFeedbackState('Erro ao cadastrar produto!','failure_create' );
  };

  function messageFeedbackState(message,cllassAdd) {
    document.querySelector('.content_text_module-action').classList.add(cllassAdd)
    setMessageState(message);
    setTimeout(() => {
      document.querySelector('.content_text_module-action').classList.remove(cllassAdd)
    }, 2000);
    setMessageState('');
  }

  return (
    <div className='module-content'>
      { loading && <Loading/> }
      <form 
        id='FormProdCreate'
        onSubmit={handdlerForm}
      >
        <div className="wrapper-manager_prod">
          <div className="content_text_module-action">
            {
              messageState !== '' ? messageState : "Cadastro de novo produto!"
            }
          </div>
            <div className="manager_prod_top">
              <ImagesLayout/>
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