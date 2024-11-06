import React from 'react'
import './ProdFieldRigth.css'
import ProdCreateBrand from './ProdCreateBrand'
import ProdCreateCategory from './ProdCreateCategory'
import ProdPriccing from './ProdPricing'

function ProdFieldRigth() {


  return (
    <div className='prod_rigth_fields'>
      
      <div className="attributes_create">
        <ProdCreateBrand/>
        <ProdCreateCategory/>
      </div>
      <ProdPriccing/>

    </div>
  )
}

export default ProdFieldRigth