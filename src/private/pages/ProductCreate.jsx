import { useState } from 'react';

import fetchAxios from '../axios/config';
import '../style/module.css'

import ImagesLayout from '../components/products/thumbnails/ImagesLayout'
import MovieLayout from '../components/products//thumbnails/MovieLayout'
import TopBar from '../components/TopBar/TopBar'
import ProdCreateBrand from '../components/products/insert_brand_categorys/ProdCreateBrand';
import ProdCreateCategorys from '../components/products/insert_brand_categorys/ProdCreateCategorys';
import ProdPrice from '../components/products/pricing/ProdPrice';
import AdvertisingLayout from '../components/products/thumbnails/AdvertisingLayout';
import ProdCreateDescription from '../components/products/common_attributes/CommonAttributes';
import ViewProductLayout from '../components/products/ViewProductLayout';
import Loading from '../components/loading/Loading';

function ProductCreate() {
  const [thumbnails, setThumbnails]  = useState([]);
  const [advertising, setAdvertising] = useState([]);
  const [viewProduct, setViewProduct] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmitForm (e){
    e.preventDefault();
    setLoading(true);
    const bodyData = new FormData(e.target);

    bodyData.append("thumbnail_length", thumbnails.length);
    thumbnails.forEach((file, i) => {
      bodyData.append('thumbnails', file);
    });
    
    bodyData.append("advertising_length", advertising.length);
    advertising.forEach((file, i) => {
      bodyData.append('thumbnails', file);
    });

    fetchAxios.post('/product/crud/create', bodyData,{headers: {'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Produto cadastrado com sucesso:', response.data);
      setLoading(false);
      alert("Cadastro realizado com sucesso!");
    })
    .catch((error) => {
      setLoading(false);
      console.error('Erro ao cadastrar o produto:', error);
      getErrors(error.response.data);
    });
  }

  function getErrors(data){
    let errorsExistis = data.errors ? data.errors : null;
    if(errorsExistis){
      console.log('data', errorsExistis);
      alert(errorsExistis.map((err) => err.msg).join('\n'));
    } else {
      alert(data.message);
    }
  };

  return (
    <main className="container-fluid">
        { loading && <Loading /> }

        <form 
          id='FormCreateProduct'
          className={`product-create-form ${viewProduct ? "hidden" : ""}`}
          onSubmit={onSubmitForm} 
        >
          <TopBar text={'Cadastro de produto'}/>
          <div className="content-top-module">
            <ImagesLayout setThumbnails={setThumbnails} thumbnails={thumbnails} />
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
              <AdvertisingLayout 
                setAdvertising={setAdvertising}
                advertising={advertising}
                setViewProduct={setViewProduct}
              />
            </div>
          </div>
        </form>

        {viewProduct && 
          <ViewProductLayout 
            setViewProduct={setViewProduct} 
            viewProduct={viewProduct}
            cThumbnail={thumbnails}
            cAdvertsising={advertising}
        />}
    </main>
  )
}

export default ProductCreate