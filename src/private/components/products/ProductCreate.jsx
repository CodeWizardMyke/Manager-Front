import React from 'react'
import FieldsFormCreateProducts from '../../configs/FieldsFormCreateProduct'
import FieldFormItem from './FormCreate/FieldFormItem';
import FieldsFormDescription from './FormCreate/FieldsFormDescription';
import UtilitisProductCreate from './util/UtilitisProductCreate';

function ProductCreate() {
  const FieldsForm = FieldsFormCreateProducts;

  return (
    <div className='module-content'>
      <div className='utils-content'>
        <UtilitisProductCreate/>
      </div>
      <div className="module-actions">
        <form className='form-dual'>

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