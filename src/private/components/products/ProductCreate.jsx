import React, { useContext, useEffect, useState } from 'react'
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';

import './ProductCreate.css'
import ProdThumbnails from './assets/ProdThumbnails';
import ProdMovie from './assets/ProdMovie,';
import ProdFieldsLeft from './assets/ProdFieldsLeft';
import ProdFieldRigth from './assets/ProdFieldRigth';
import ProductCreateContext from '../../context/ProductCreateContext';

function ProductCreate() {
  const {loading, setLoading,thumbnails, setThumbnails, setAdvertisings,setMovieURL, advertisings, unformatPrice} = useContext(ProductCreateContext);
  const [productCreateState, setProductCreateState] = useState(false);
  const [productFailure,setProductFailure] = useState(false);
  const [messageState, setMessageState ] = useState('');
  const [oldErrors,setOldErrors] = useState([])

  async function handdlerForm(event){
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);

    const thumbnailsLength = thumbnails.length;
    const advertisingLength = advertisings.length;

    formData.set('thumbnail_length', thumbnailsLength);
    formData.set('advertising_length', advertisingLength);

    thumbnails.forEach((file, index) => {
      formData.append('thumbnails', file);
    });
    advertisings.forEach((file, index) => {
      formData.append('thumbnails', file);
    });
    
    let costPriceUnFormat = unformatPrice(formData.get('product_cost'))
    formData.set('product_cost', costPriceUnFormat);

    try {
      await fetchAxios.post('product/crud/create',formData,{headers:{'Content-Type':'multipart/form-data'}});

      ProductCreated(event.target)

    } catch (error) {
      console.log('error', error)
      functionProductFailure(event.target,error)
      setLoading(false);
    }
  }
  
  function ProductCreated(form) {
    setProductCreateState(true)
    form.reset();
  }

  function functionProductFailure(form,error){
    let errors = null;
    if(error.response.data.errors){
      errors = error.response.data.errors
    }else{
      if(error.response.data[0].path === 'thumbnails'){
        let content_select_images = document.querySelector('.wrapper_thumbnails_list')
        content_select_images.classList.add('field_error');
        return false
      }else{
        window.alert('error inesperado');
        return console.log('Error', error)
      }
    }
    setProductFailure(true);

    let content_select_images = document.querySelector('.wrapper_thumbnails_list')
    content_select_images.classList.remove('field_error')

    if(oldErrors.length){
      oldErrors.map( element => {
        const input = document.querySelector(`#${element.path}`);
        if(input){
          input.classList.remove('field_error')
          return input 
        }else{
          return false
        }
      })
    }
    
    errors.map( element => {
      const input = document.querySelector(`#${element.path}`);
      if(input){
        input.classList.add('field_error')
        return input
      }else{
        return false
      }
    })
    
    if(errors.length){
      setOldErrors(errors)
    }
  }

  useEffect(()=> {
    setMovieURL('');
    setThumbnails([]);
    setAdvertisings([]);
  },[setMovieURL,setThumbnails,setAdvertisings])

  useEffect(()=> {
    if(productCreateState){
      document.querySelector('.content_text_module-action').classList.add('sucess_created')
      setMessageState('Cadastrado com sucesso!');
      setTimeout(() => {
        setProductCreateState(false)
        document.querySelector('.content_text_module-action').classList.remove('sucess_created')
      }, 2000);
    }else{
      setMessageState('');

    }

    if(productFailure){
      document.querySelector('.content_text_module-action').classList.add('failure_create')
      setMessageState('Erro ao cadastrar produto!');
      setTimeout(() => {
        setProductFailure(false)
        document.querySelector('.content_text_module-action').classList.remove('failure_create')
      }, 2000);
    }else{
      setMessageState('');
    }
  },[productCreateState,setProductCreateState, productFailure, setProductFailure, setMessageState])

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