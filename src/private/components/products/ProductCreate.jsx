import React from 'react'
import FieldsFormCreateProducts from '../../configs/FieldsFormCreateProduct'
import FieldFormItem from './FormCreate/FieldFormItem';
import FieldsFormPriceProduct from './FormCreate/FieldsFormPriceProduct';
import FieldsFormDescription from './FormCreate/FieldsFormDescription';

function ProductCreate() {
  const FieldsForm = FieldsFormCreateProducts;

  return (
    <div className='module-content'>
      <div >
      </div>
      <div className="module-actions">
        <form className='form-dual'>

          <div className="form-rigth">
            {
              FieldsForm.map((field,index) => (
                <FieldFormItem key={`FieldFormProd_${index}`} inputConfig={field.inputConfig} cssConfig={field.cssConfig} />
              ))
            }

            <FieldsFormPriceProduct/>

            <div className="form-checkbox">
              <label htmlFor="use_thumbnail">Usar Miniatura:</label>
              <input type="checkbox" id="use_thumbnail" name="use_thumbnail" defaultChecked />
              <div className="error errors-use_thumbnail"></div>
            </div>

            <div className="form-checkbox">
              <label htmlFor="catalog_listing">Listagem no Catálogo:</label>
              <input type="checkbox" id="catalog_listing" name="catalog_listing" defaultChecked />
              <div className="error errors-catalog_listing"></div>
            </div>

            <div className="form-checkbox">
              <label htmlFor="discounts">Autorizar descontos:</label>
              <input type="checkbox" id="discounts" name="discounts"  />
              <div className="error errors-discounts"></div>
            </div>
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