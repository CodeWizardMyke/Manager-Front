import React, { useEffect, useState } from 'react';
import './ViewProductLayout.css';

import TopBar from '../TopBar/TopBar';
import Carrousel from './carrousel/Carrousel';
import ProdDetails from './ProdDetails/ProdDetails';


function ViewProductLayout({ setViewProduct, viewProduct, images = [], advertising = [] }) {
  const [dataProduct, setDataProduct] = useState({});

  
  useEffect(() => {
    const body = document.getElementById("FormCreateProduct");
    if (!body) return;
    
    const formData = new FormData(body);
    const productData = Object.fromEntries(formData.entries());
    setDataProduct(productData);
  }, []);

  return (
    <main className="ViewProductLayout">
      <button className="bt-prevPage" onClick={() => setViewProduct(!viewProduct)}>Voltar ao cadastro</button>
      <TopBar text={"Visualização da listagem interna do produto"} />

      <div className="containerVPL">
        <Carrousel images={images.slice(0, dataProduct.thumbnail_length)} dataProduct={dataProduct} />
        <ProdDetails dataProduct={dataProduct} />
        <div className="description">
          <h2>Descrição do Produto</h2>
              <p>{dataProduct.discribe}</p>
        </div>
      </div>
      <div className="advertising">
        {
          advertising.length > 0 && (
            <div className="ads-container">
              {
                advertising.map((ad, index) => (
                  <div key={index} className="ad-image">
                    <img src={URL.createObjectURL(ad)} alt={`Publicidade ${index + 1}`} />
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
