import React from 'react'
import './ProdFieldRigth.css'
import ProdCreateBrand from './ProdCreateBrand'
import ProdCreateCategory from './ProdCreateCategory'
import ProdPriccing from './ProdPricing'
import FormButtonsAndAdv from './FormButtonsAndAdv'

function ProdFieldRigth() {

  return (
    <div className='prod_rigth_fields'>
      <div className="attributes_create">
        <ProdCreateBrand/>
        <ProdCreateCategory/>
      </div>
      <ProdPriccing/>
      <FormButtonsAndAdv/>
    </div>
  )
}

export default ProdFieldRigth