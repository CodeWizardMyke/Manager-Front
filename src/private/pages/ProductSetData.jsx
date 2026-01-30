//pagina para adicionar produtos e tambem editar os mesmos
import React, { useRef, useState } from 'react'

import Loading from '../components/loading/Loading'
import createProduct from '../functions/createProduct';
import ImagesLayout from '../components/products/thumbnails/ImagesLayout';
import MovieLayout from '../components/products/thumbnails/MovieLayout';
import ProdPrice from '../components/products/pricing/ProdPrice';
import AdvertisingLayout from '../components/products/thumbnails/AdvertisingLayout';
import ViewProductLayout from '../components/products/ViewProductLayout';
import CommonAttributes from '../components/products/common_attributes/CommonAttributes';
import TopBar from '../components/TopBar/TopBar';
import putProduct from '../functions/puProduct';
import deleteProductApi from '../functions/deleteProductApi';
import ContentBrandProduct from '../components/products/brand_category/ContentBrandProduct';
import ContentCategoryProduct from '../components/products/brand_category/ContentCategoryProduct';

function ProductSetData({DataContent, setDataContent, setUpdatedOrder}) {
  const [loading, setLoading] = useState(false);
  const [viewProduct,setViewProduct] = useState(null);
  const formRef = useRef(null);
  const [movieRemoved, setMovieRemoved] = useState(false);
  const [removedImg, setRemovedImg] = useState([]);
  const [thumbnails, setThumbnails]= useState([]);
  const [advertisings, setAdvertisings]= useState([]);  

  async function sendRequest(event){
    try {

      event.preventDefault();
      setLoading(true);
  
      await createProduct(event.target, thumbnails, advertisings);
      
      setLoading(false);
      alert("Producto cadastrado com sucesso!");
      
    } catch (error) {
      console.log('error', error);
      setLoading(false);
      handlerErrors(error);
    }
  }

  async function updateProduct() {
    try {
      setLoading(true);
      const dataForm = new FormData(formRef.current);
      
      if(movieRemoved){
        dataForm.append("movie_removed", true);
      }

      let thumbApendLength = 0;
      thumbnails.forEach(image => {
        if (!image.fromApi && image.file) {
          thumbApendLength += 1;
          dataForm.append("thumbnails", image.file);
        }
      })
      dataForm.append("thumbnail_length", thumbApendLength);
      
      let advertApendLength = 0;
      advertisings.forEach(image => {
        if (!image.fromApi && image.file) {
          advertApendLength += 1;
          dataForm.append("thumbnails", image.file);
        }
      })
      dataForm.append("advertising_length", advertApendLength);

      dataForm.append("product_id", DataContent.product_id);
      dataForm.append("thumbnails_removed",removedImg);
      
      const response = await putProduct({ htmlForm: dataForm });

      setUpdatedOrder(true);
      setDataContent(response.data);
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log('error', error);

    }
  }

  async function deleteProduct() {
    try {
      setLoading(true);
      await deleteProductApi({product_id: DataContent.product_id});
      setUpdatedOrder(true);
      setDataContent(null);
      
      setLoading(false);
      
    } catch (error) {
      console.log('error', error);
      alert('Erro ao deletar produto');
    }
  }

  function handlerErrors(params) {
    if(params.errors){
      console.log('data', params.errors);
      alert(params.errors.map((err) => err.msg).join('\n'));
    }
  }

  return (
    <main className="container-fuild">
      { loading && <Loading /> }
      {DataContent && <button type='button' className='ButtonFixed' onClick={ () => setDataContent(null)} >Voltar</button>}
      <form 
        ref={formRef}
        className={`product-create-form ${viewProduct ? "hidden" : ""}`}
        onSubmit={e => sendRequest(e)}
      >
        <TopBar text={'Cadastro de produto'}/>
        <div className="content-top-module">
          <ImagesLayout  setThumbnails={setThumbnails} thumbnails={thumbnails} DataContent={DataContent} setRemoveFromApi={setRemovedImg}  />
          <MovieLayout DataContent={DataContent} setMovieRemoved={setMovieRemoved} />
        </div>

        <div className="content-bottom-module">
          <div className="rightContent"> <CommonAttributes DataContent={DataContent} /> </div>
          <div className="leftContent">

            <ContentBrandProduct dataContent={DataContent} />
            <ContentCategoryProduct dataContent={DataContent} />
            
            <ProdPrice DataContent={DataContent} />
            <AdvertisingLayout
              setAdvertising={setAdvertisings}
              advertising={advertisings}
              setViewProduct={setViewProduct} 
              DataContent={DataContent}
              updateProduct={updateProduct}
              setRemoveFromApi={setRemovedImg} 
              deleteProduct={deleteProduct}
            />
          </div>
        </div>

      </form>
      { viewProduct && 
        <ViewProductLayout 
          data={DataContent}
          setViewProduct={setViewProduct}
          viewProduct={viewProduct}
          cAdvertsising={advertisings}
          cThumbnail={ thumbnails}
      />}
    </main>
  )
}

export default ProductSetData