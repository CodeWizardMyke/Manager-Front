import React from 'react'
import './ProdFieldRigth.css'
import ProdCreateBrand from './ProdCreateBrand'
import ProdCreateCategorys from './ProdCreateCategorys'

function ProdFieldRigth({data}) {
  return (
    <div className='prod_rigth_fields'>
      <div className="attributes_create">
        <ProdCreateBrand data={'data'} />
        <ProdCreateCategorys data={'data'} />
        <div className="prodPrice">
          <label htmlFor="price">Price</label>
          <input type="number" name='price' id='price' placeholder='0.00' />
        </div>
      </div>
    </div>
  )
}

export default ProdFieldRigth