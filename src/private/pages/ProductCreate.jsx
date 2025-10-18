import { useState } from 'react';
import ImagesLayout from '../components/products/ImagesLayout'
import MovieLayout from '../components/products/MovieLayout'
import TopBar from '../components/TopBar/TopBar'

import '../style/module.css'

import ProdCreateBrand from '../components/products/ProdCreateBrand';
import ProdCreateCategorys from '../components/products/ProdCreateCategorys';
import ProdPrice from '../components/products/ProdPrice';
import AdvertisingLayout from '../components/products/AdvertisingLayout';
import ProdCreateDescription from '../components/products/ProdCreateDescription';

function ProductCreate() {
  const [togleText, setTogleText] = useState('cadastrar produto');

  return (
    <main className="container-fluid">
      <form className="product-create-form" >
        <TopBar text={togleText}/>
        <div className="content-top-module">
          <ImagesLayout/>
          <MovieLayout/>
        </div>
        <div className="content-bottom-module">
          <div className="rightContent">
            <ProdCreateDescription/>
          </div>
          <div className="leftContent">
            <ProdCreateBrand/>
            <ProdCreateCategorys/>
            <ProdPrice/>
            <AdvertisingLayout/>
          </div>
        </div>
      </form>
    </main>
  )
}

export default ProductCreate