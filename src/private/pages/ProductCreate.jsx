import { useRef, useState } from 'react';

import fetchAxios from '../axios/config';
import '../style/module.css'

import ImagesLayout from '../components/products/thumbnails/ImagesLayout'
import MovieLayout from '../components/products//thumbnails/MovieLayout'
import TopBar from '../components/TopBar/TopBar'
import ProdPrice from '../components/products/pricing/ProdPrice';
import AdvertisingLayout from '../components/products/thumbnails/AdvertisingLayout';
import ProdCreateDescription from '../components/products/common_attributes/CommonAttributes';
import ViewProductLayout from '../components/products/ViewProductLayout';
import Loading from '../components/loading/Loading';
import ContentBrandProduct from '../components/products/brand_category/ContentBrandProduct';
import ContentCategoryProduct from '../components/products/brand_category/ContentCategoryProduct';

function ProductCreate() {
  const [thumbnails, setThumbnails]  = useState([]);
  const [advertising, setAdvertising] = useState([]);
  const [viewProduct, setViewProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearFields, setClearFields] = useState(false);
  const useForm = useRef(null);

  function onSubmitForm (e){
    e.preventDefault();
    setLoading(true);
    const bodyData = new FormData(e.target);

    let thumbApendLength = 0;
      thumbnails.forEach(image => {
        if (!image.fromApi && image.file) {
          thumbApendLength += 1;
          bodyData.append("thumbnails", image.file);
        }
      })
      bodyData.append("thumbnail_length", thumbApendLength);
      
      let advertApendLength = 0;
      advertising.forEach(image => {
        if (!image.fromApi && image.file) {
          advertApendLength += 1;
          bodyData.append("thumbnails", image.file);
        }
      })
      bodyData.append("advertising_length", advertApendLength);

    fetchAxios.post('/product/crud/create', bodyData,{headers: {'Content-Type': 'multipart/form-data'}})
    .then((response) => {
      console.log('Produto cadastrado com sucesso:', response.data);

      setLoading(false);
      alert("Cadastro realizado com sucesso!");
      clearForm();
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

  function clearForm(){
      setThumbnails([]);
      setAdvertising([]);
      setClearFields(true);
      useForm.current.reset();
  }

  return (
    <main className="container-fluid">
        { loading && <Loading /> }

        <form 
          ref={useForm}
          id='FormCreateProduct'
          className={`product-create-form ${viewProduct ? "hidden" : ""}`}
          onSubmit={onSubmitForm} 
        >
          <TopBar text={'Cadastro de produto'}/>
          <div className="content-top-module">
            <ImagesLayout setThumbnails={setThumbnails} thumbnails={thumbnails} />
            <MovieLayout
            clearFields={clearFields} 
            setClearFields={setClearFields}
            />
          </div>
          <div className="content-bottom-module">
            <div className="rightContent">
              <ProdCreateDescription/>
            </div>
            <div className="leftContent">
              <div className="contentAtt">
                <ContentBrandProduct/>
                <ContentCategoryProduct/>
              </div>
              <ProdPrice
                clearFields={clearFields} 
                setClearFields={setClearFields}
              />
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