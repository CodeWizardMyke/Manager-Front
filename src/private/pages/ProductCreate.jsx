import { useState } from 'react';
import ImagesLayout from '../components/products/ImagesLayout'
import MovieLayout from '../components/products/MovieLayout'
import TopBar from '../components/TopBar/TopBar'

import '../style/module.css'
import ProdFieldRigth from '../components/products/ProdFieldRigth';
import ProdCreateBrand from '../components/products/ProdCreateBrand';
import ProdCreateCategory from '../components/products/ProdCreateCategory';

function ProductCreate() {
  const [togleText, setTogleText] = useState('cadastrar produto');

  return (
    <main className="container-fluid">
      <TopBar text={togleText}/>
      <div className="content-top-module">
        <ImagesLayout/>
        <MovieLayout/>
      </div>
      <div className="content-bottom-module">
        <ProdCreateBrand data={'data'} />
      </div>
    </main>
  )
}

export default ProductCreate