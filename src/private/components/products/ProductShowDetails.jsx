import React, { useContext, useState } from 'react'
import Loading from '../loading/Loading'
import ProdFieldsLeft from './assets/ProdFieldsLeft'
import ProdFieldRigth from './assets/ProdFieldRigth'
import ProdMovie from './assets/ProdMovie,'
import ProdThumbnails from './assets/ProdThumbnails'
import ProductCreateContext from '../../context/ProductCreateContext'

function ProductShowDetails({data}) {
  const [messageState,setMessageState] = useState('');
  const {loading} = useContext(ProductCreateContext)
  
  const handdlerForm = async (event) => {
    event.preventDefault();
    try {
    console.log(setMessageState)
      
    } catch(error) {
      console.log(error);
    }
  }

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
              <ProdThumbnails data = {data.thumbnails}/>
              <ProdMovie data={data.movie_url}/>
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