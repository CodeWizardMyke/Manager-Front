import React, { useContext, useEffect, useState } from 'react'
import Loading from '../loading/Loading'
import fetchAxios from '../../axios/config';

import ProdFieldsLeft from './assets/ProdFieldsLeft'
import ProdFieldRigth from './assets/ProdFieldRigth'
import ProdMovie from './assets/ProdMovie,'
import ProdThumbnails from './assets/ProdThumbnails'
import ProductCreateContext from '../../context/ProductCreateContext'

function ProductShowDetails({data}) {
  const {loading, setLoading,thumbnails, advertisings, thumbnails_removed,set_thumbnails_removed, unformatPrice} = useContext(ProductCreateContext);
  const [messageState,setMessageState] = useState('');
  const [oldErrors,setOldErrors] = useState([])

  const handdlerForm = async (event) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    
    formData.set('product_id', data.product_id);
    formData.set('product_cost', unformatPrice(formData.get('product_cost')));
    
    const files = [...thumbnails, ...advertisings]
    let dataFiles = JSON.stringify(files)
    formData.set('dataFiles', dataFiles )
    files.forEach( element => {
      formData.append('thumbnails', element.file)
    })
    thumbnails_removed.forEach( element => {
      formData.append('thumbnails_removed', element.thumbnail_id)
    })

    try {
      await fetchAxios.put('product/crud/update',formData,{headers:{'Content-Type':'multipart/form-data'}});
      setLoading(false);

      messageFeedbackState('Atualizado com sucesso!','sucess_created' );
    } catch (error) {
      console.log('error', error)
      if(error.status === 500){
        window.alert("Erro interno na aplicação codigo 500")
        return false
      }
      functionProductFailure(error)
      setLoading(false);
    }
  }

  function functionProductFailure(error){
    let data = error.response.data;
    
    if(oldErrors.length > 0) oldErrors.map( element => document.querySelector(`#${element.path}`).classList.remove('field_error') );

    if(data.errors.length > 0) data.errors.map( element => document.querySelector(`#${element.path}`).classList.add('field_error') );
    
    setOldErrors(data.errors);
    messageFeedbackState('Erro ao atualizar o produto!','failure_create' );
  };

  function messageFeedbackState(message,cllassAdd) {
    document.querySelector('.content_text_module-action').classList.add(cllassAdd)
    setMessageState(message);
    setTimeout(() => {
      document.querySelector('.content_text_module-action').classList.remove(cllassAdd)
    }, 2000);
    setMessageState('');
  }

  useEffect(()=>{
    set_thumbnails_removed([])
  },[set_thumbnails_removed] )

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
              <ProdThumbnails data = {data}/>
              <ProdMovie data={data}/>
            </div>
            <div className="manager_prod_bottom">
              <ProdFieldsLeft data={data} />
              <ProdFieldRigth data={data}/>
            </div>
        </div>
      </form>
    </div>
  )
}

export default ProductShowDetails