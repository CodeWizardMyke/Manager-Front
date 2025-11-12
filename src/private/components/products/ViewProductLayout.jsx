import React, { useEffect, useState } from 'react';
import './ViewProductLayout.css';

import TopBar from '../TopBar/TopBar';
import Carrousel from './carrousel/Carrousel';
import ProdDetails from './ProdDetails/ProdDetails';
import fetchAxios from '../../axios/config';

function ViewProductLayout({data, setViewProduct, viewProduct, cThumbnail = [], cAdvertsising = [], DataContent }) {
  const [ dataExsists, setDataExists ] = useState(false);
  const [dataProduct, setDataProduct] = useState({});
  const [thumbnails, setThumbnails] = useState([]);
  const [advertisings, setAdvertisings] = useState([]);

  useEffect(() => {
    if (data) {
      setDataExists(true);
      setDataProduct(data);
      generateImageURLs();
      return;
    }

    // pega os dados que estao sendo inseridos pelo usuario no formulário
    const body =  document.getElementById("FormCreateProduct");
    if (!body) return;
    
    imageLocalURL(cThumbnail,cAdvertsising);

    const formData = new FormData(body);
    const productData = Object.fromEntries(formData.entries());
    setDataProduct(productData);
  }, [dataExsists,DataContent]);

  function imageLocalURL(Thumbnail, Advertsising) {
    let arrThumbnails =[]
    let arrAdvertisings =[]

    if(Thumbnail){
      //Thumbnail.map( element => arrThumbnails.push( URL.createObjectURL(element) ) )
    }
    if(Advertsising){
     // Advertsising.map( element => arrAdvertisings.push( URL.createObjectURL(element) ) )
    }
    setAdvertisings(arrAdvertisings)
    setThumbnails(arrThumbnails)
      
    console.log('advertisings', advertisings)
    console.log('thumbnails', thumbnails)
  }

  function generateImageURLs() {
    const path = fetchAxios.defaults.baseURL.split('/api')[0] ;

    if(dataProduct.thumbnails){
      let arrThumbnails =[]
      let arrAdvertisings =[]
      dataProduct.thumbnails.map( element => {
        if(element.type === 0){
          arrThumbnails.push( path +  element.path )
        }else{
          arrAdvertisings.push( path +  element.path )
        }
      } )
      setAdvertisings(arrAdvertisings)
      setThumbnails(arrThumbnails)
    }
  }

  return (
    <main className="ViewProductLayout">
      <button className="bt-prevPage" onClick={() => setViewProduct(!viewProduct)}>Voltar ao cadastro</button>
      <TopBar text={"Visualização da listagem interna do produto"} />

      <div className="containerVPL">
        <Carrousel images={thumbnails} dataProduct={dataProduct} />
        <ProdDetails dataProduct={dataProduct} />
        <div className="description">
          <h2>Descrição do Produto</h2>
              <p>{dataProduct.discribe}</p>
        </div>
      </div>
      <div className="advertising">
        {
          advertisings.length > 0 && (
            <div className="ads-container">
              {
                advertisings.map((element, index) => (
                  <div key={index} className="ad-image">
                    <img src={element} alt={`Publicidade ${index + 1}`} />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>

    </main>
  );
}

export default ViewProductLayout;
