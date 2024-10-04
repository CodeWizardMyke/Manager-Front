import React, { useEffect, useState } from 'react'
import FieldsFormCreateProducts from '../../configs/FieldsFormCreateProduct'
import FieldFormItem from './FormCreate/FieldFormItem';
import FieldsFormDescription from './FormCreate/FieldsFormDescription';
import UtilitisProductCreate from './util/UtilitisProductCreate';
import fetchAxios from '../../axios/config';
import Loading from '../loading/Loading';
import FBResponse from '../pupup/FBResponse';

function ProductCreate({prodItemData, setProdItemData}) {
  const FieldsForm = FieldsFormCreateProducts;
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false)

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
    <div className='module-content'>
      { loading && <Loading/> }
      { popup && <FBResponse msg={"produto cadastrado com sucesso!"} />}
      {
        prodItemData && (
          <div className='top-utils'>
            <h4>Atualizar produto ID: {prodItemData.product_id}</h4>
            <button className='bt bt-close' onClick={()=> {setProdItemData(null)}}>Fechar</button>
          </div>
        )
      }
      {
        !prodItemData && (
        <div className="top-utils">
          <div className="content-util">
            <h3>Cadastro de um novo produto</h3>
          </div>
        </div>
        )
      }

      <div className='utils-content'>
        <UtilitisProductCreate/>
      </div>
      <div className="module-actions">
        <form className='form-dual' onSubmit={handdlerForm} >

          <div className="form-rigth">
            {
              FieldsForm.map((field,index) => (
                <FieldFormItem key={`FieldFormProd_${index}`} inputConfig={field.inputConfig} cssConfig={field.cssConfig} prodItemData={prodItemData} />
              ))
            }
          </div>
          <div className="form-left">
            <FieldsFormDescription prodItemData={prodItemData}/>
            <div className='content-bt-form'>
              <button className='bt bt-primary'>{prodItemData ? 'Atualizar' : "Cadastrar"}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductCreate