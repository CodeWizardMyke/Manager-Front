//pagina para adicionar produtos e tambem editar os mesmos
import React, { useEffect, useState } from 'react'

import Loading from '../components/loading/Loading'
import createProduct from '../functions/createProduct';
import ImagesLayout from '../components/products/thumbnails/ImagesLayout';
import MovieLayout from '../components/products/thumbnails/MovieLayout';
import ProdCreateBrand from '../components/products/insert_brand_categorys/ProdCreateBrand';
import ProdCreateCategorys from '../components/products/insert_brand_categorys/ProdCreateCategorys';
import ProdPrice from '../components/products/pricing/ProdPrice';
import AdvertisingLayout from '../components/products/thumbnails/AdvertisingLayout';
import ViewProductLayout from '../components/products/ViewProductLayout';
import CommonAttributes from '../components/products/common_attributes/CommonAttributes';
import TopBar from '../components/TopBar/TopBar';
import fetchAxios from '../axios/config';

function ProductSetData({DataContent, setDataContent, setUpdatedOrder}) {
  const [loading, setLoading] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [advertising, setAdvertising] = useState([]);
  const [viewProduct,setViewProduct] = useState(null);
  const [imagesRemovedFromApi, setImagesRemovedFromApi] = useState([]);

  useEffect(() => {
  console.log('imagesRemovedFromApi', imagesRemovedFromApi)
  }, [imagesRemovedFromApi]);

  async function sendRequest(event){
    event.preventDefault();
    setLoading(true);

    const response = await createProduct(event.target, thumbnails, advertising);
    if(response.error) {
      handlerErrors(response.error);
    };

    setLoading(false);
    alert("Producto cadastrado com sucesso!");
  }

  async function updateProduct() {
    const DataFormHtml = document.querySelector("#FormCreateProduct");
    const dataForm = new FormData(DataFormHtml);
    dataForm.append("removed_thumbnails", JSON.stringify(imagesRemovedFromApi));

    thumbnails.forEach( (file, index) => {
      if(typeof file !== "string"){
        dataForm.append("thumbnails", file);
      }
    })
    return false 
    try {
      const response = await fetchAxios.put(
        "/product/crud/update",
        dataForm,
        {"Content-Type": "multpart/form-data"}
      )
      setDataContent(response.data);
      setUpdatedOrder(true);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      alert(error.response.data.msg || "Erro ao atualizar produto");
      console.log('error', error)
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
      {DataContent && <button type='button' className='ButtonFixed' onClick={e => setDataContent(null)} >Voltar</button>}
      <form 
        id='FormCreateProduct'
        className={`product-create-form ${viewProduct ? "hidden" : ""}`}
        onSubmit={e => sendRequest(e)}
      >
        <input type="hidden" name="product_id" value={DataContent.product_id} />
        <TopBar text={'Cadastro de produto'}/>

        <div className="content-top-module">
          <ImagesLayout 
            imagesChenged={setThumbnails} 
            DataContent={DataContent} 
            setImagesRemovedFromApi={setImagesRemovedFromApi}
          />
          <MovieLayout DataContent={DataContent} />
        </div>

        <div className="content-bottom-module">
          <div className="rightContent"> <CommonAttributes DataContent={DataContent} /> </div>
          <div className="leftContent">
            <ProdCreateBrand DataContent={DataContent} />
            <ProdCreateCategorys DataContent={DataContent} />
            <ProdPrice DataContent={DataContent} />
            <AdvertisingLayout
              imagesChenged={setAdvertising}
              setViewProduct={setViewProduct} 
              DataContent={DataContent}
              updateProduct={updateProduct}
              imagesRemovedFromApi={imagesRemovedFromApi}
            />
          </div>
        </div>

      </form>
      { viewProduct && 
        <ViewProductLayout 
          data={DataContent}
          setViewProduct={setViewProduct}
          viewProduct={viewProduct}
          cThumbnail={thumbnails}
          cAdvertsising={advertising}
      />}
    </main>
  )
}

export default ProductSetData