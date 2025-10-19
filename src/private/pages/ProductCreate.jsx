import { useState } from 'react';
import ImagesLayout from '../components/products/ImagesLayout'
import MovieLayout from '../components/products/MovieLayout'
import TopBar from '../components/TopBar/TopBar'

import fetchAxios from '../axios/config';
import '../style/module.css'

import ProdCreateBrand from '../components/products/ProdCreateBrand';
import ProdCreateCategorys from '../components/products/ProdCreateCategorys';
import ProdPrice from '../components/products/ProdPrice';
import AdvertisingLayout from '../components/products/AdvertisingLayout';
import ProdCreateDescription from '../components/products/ProdCreateDescription';
import Loading from '../components/loading/Loading';

function ProductCreate() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  function onSubmitForm (e){
    e.preventDefault();
    setLoading(true);
    const bodyData = new FormData(e.target);

    // Anexa as imagens do estado manualmente:
    images.forEach((file, i) => {
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
      <form className="product-create-form" onSubmit={onSubmitForm}>
        <TopBar text={'Cadastro de produto'}/>
        <div className="content-top-module">
          <ImagesLayout imagesChenged={setImages}/>
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
            <AdvertisingLayout imagesChenged={setImages} />
          </div>
        </div>
      </form>
    </main>
  )
}

export default ProductCreate