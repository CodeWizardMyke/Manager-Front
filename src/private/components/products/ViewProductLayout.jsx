import React, { useEffect, useState } from 'react';
import './ViewProductLayout.css';
import TopBar from '../TopBar/TopBar';
import { GrYoutube } from "react-icons/gr";


function ViewProductLayout({ setViewProduct, viewProduct, images = [] }) {
  const [dataProduct, setDataProduct] = useState({});
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);
  const [imgThumbnails, setImgThumbnails] = useState([]);
  const [imgAdvertising, setImgAdvertising] = useState([]);

  console.log('dataProduct', dataProduct)

  useEffect(() => {
    const body = document.getElementById("FormCreateProduct");
    if (!body) return;

    const formData = new FormData(body);
    const productData = Object.fromEntries(formData.entries());
    setDataProduct(productData);
  }, []);

  useEffect(() => {
    if (!images.length || !dataProduct.thumbnail_length || !dataProduct.advertising_length) return;

    const thumbLength = Number(dataProduct.thumbnail_length);
    const advLength = Number(dataProduct.advertising_length);

    const thumbnails = images.slice(0, thumbLength);
    const advertisings = images.slice(thumbLength, thumbLength + advLength);

    setImgThumbnails(thumbnails);
    setImgAdvertising(advertisings);
  }, [dataProduct, images]);

  function getImageSrc(img) {
    if (img instanceof File) {
      return URL.createObjectURL(img);
    }
    if (typeof img === 'string') {
      return img;
    }
    return '';
  }

  function nextImage() {
    setIndexCurrentImage((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setIndexCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  }

  function getNexttImageIndex() {
    let nextImage = indexCurrentImage + 1;
    if(nextImage < imgThumbnails.length){
      return nextImage
    }else{
      return 0
    }
  }

  function getPrevImageIndex(){
    let prevImage = indexCurrentImage - 1;
    if(prevImage >= 0){
      return prevImage
    }else{
      return imgThumbnails.length -1
    }
  }

  return (
    <main className="ViewProductLayout">
      <button className="bt-prevPage" onClick={() => setViewProduct(!viewProduct)}>Voltar</button>

      <TopBar text={"Visualização da listagem interna do produto"} />

      <div className="top_container_carrousel">

        <div className="carrousel-title">{dataProduct.official_store_name}</div>
        <div className="carrousel-product">
          <div className="carrousel-left">
            <div className='icon-youtube'><GrYoutube/></div>
            <img 
              src={getImageSrc(imgThumbnails[getPrevImageIndex()])} 
              alt="image prev product" 
              onClick={prevImage}
            />
          </div>

          <div className="carrousel-current">
            <img src={getImageSrc(imgThumbnails[indexCurrentImage])} alt="imagem do produto" />
          </div>

          <div 
            className="carrousel-right"
            onClick={nextImage}
          >
            <img src={getImageSrc(imgThumbnails[getNexttImageIndex()])} alt="image next product" />
          </div>
        </div>
      </div>
      
    </main>
  );
}

export default ViewProductLayout;
