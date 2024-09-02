import React, { useEffect, useState } from 'react'
import FieldsFormCreateProducts from '../../configs/FieldsFormCreateProduct'
import FieldFormItem from './FormCreate/FieldFormItem';
import FieldsFormDescription from './FormCreate/FieldsFormDescription';
import UtilitisProductCreate from './util/UtilitisProductCreate';
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';
import FBResponse from '../pupup/FBResponse';

function ProductCreate() {
  const FieldsForm = FieldsFormCreateProducts;
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false)
  let msg = "produto cadastrado com sucesso!"

  async function handdlerForm(event){
    event.preventDefault();
    setLoading(true);
    updateErrors()
    try {
      const formData = new FormData(event.target);

      await fetchAxios.post('product/crud/create',formData,{headers:{'Content-Type':'multipart/form-data'}});
      setPopup(true)
      setLoading(false);
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
    <div className='module-content'>
      { loading && <Loading/> }
      { popup && <FBResponse msg={"produto cadastrado com sucesso!"} />}
      <div className='utils-content'>
        <UtilitisProductCreate/>
      </div>
      <div className="module-actions">
        <form className='form-dual' onSubmit={handdlerForm} >

          <div className="form-rigth">
            {
              FieldsForm.map((field,index) => (
                <FieldFormItem key={`FieldFormProd_${index}`} inputConfig={field.inputConfig} cssConfig={field.cssConfig} />
              ))
            }
          </div>

          <div className="form-left">
            <FieldsFormDescription/>
            <div className='content-bt-form'>
              <button className='bt bt-primary'>Cadastrar</button>
            </div>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ProductCreate