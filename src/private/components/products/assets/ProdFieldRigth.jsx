import React from 'react'
import './ProdFieldRigth.css'
import ProdCreateBrand from './ProdCreateBrand'
import ProdCreateCategory from './ProdCreateCategory'
import ProdPriccing from './ProdPricing'
import FormButtonsAndAdv from './FormButtonsAndAdv'

function ProdFieldRigth({data}) {
  return (
    <div className='prod_rigth_fields'>
      <div className="attributes_create">
        <ProdCreateBrand data={data} />
        <ProdCreateCategory data={data} />
      </div>
      <ProdPriccing data={data} />
      <FormButtonsAndAdv data={data} />
    </div>
  )
}

export default ProdFieldRigth