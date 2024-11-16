import React, { useContext, useEffect, useState } from 'react';
import './FormButtonsAndAdv.css';
import { IoTrashBin } from 'react-icons/io5';
import ProductCreateContext from '../../../context/ProductCreateContext';
import fetchAxios from '../../../axios/config';
const url_api = fetchAxios.defaults.baseURL;
const url_public = url_api.split('/api')[0]

function FormButtonsAndAdv({data}) {
  const { advertisings, setAdvertisings } = useContext(ProductCreateContext);
  const [index, setIndex] = useState(null);

  function handlerImagesAdv(e) {
    let nextImage = Array.from(e.target.files);
    setAdvertisings((prevImage) => [...prevImage, ...nextImage]);
  }

  function removeImageAdv(index) {
    setAdvertisings((prevImages) => prevImages.filter((_, i) => i !== index));
    setIndex( null ); 
  }

  function removeAllImagesAdv() {
    setIndex(null);
    setAdvertisings([]);
  }

  useEffect(() => {
    if(data){
      const arrayImages = JSON.parse(data.thumbnails)


      const arrayFilted = arrayImages.filter( element => element.isAdvertising !==0 )
      const updatedImages = arrayFilted.map( element => url_public + element.locail)
      setAdvertisings(updatedImages)

      if(updatedImages.length > 0){
        setIndex(1)
      }
    }

  }, [data, setAdvertisings]);

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          {
            advertisings.map((image,i) => {
              return index === i ? (
                <img key={`imagem_atual_ad-${index}`} src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="imagem atual selecionada" />
              ) : null;
            })
          }
        </div>
        <div className="advThumbnailList">
          <div>
            <ul>
              {advertisings.length > 0 && advertisings.map((image, index) => (
                <li key={`listAdv_${index}`} className='wrapperAdvImage'>
                  <img
                   src={typeof image === 'object' ? URL.createObjectURL(image) : image} 
                    alt='imagem propaganda'
                    onClick={() => setIndex(index)}
                  />
                  <button type='button' className='btn_remove_img' onClick={() => removeImageAdv(index)}>
                    <IoTrashBin />
                  </button>
                </li>
              ))}
              {advertisings.length < 2 && (
                <li className='wrapperAdvImage'>
                  <label htmlFor="ad">+</label>
                  <input type="file" id="ad" onChange={handlerImagesAdv} />
                </li>
              )}
            </ul>
          </div>
          <button type='button' className="advRemoveThumbnails" onClick={removeAllImagesAdv}>
            Remover Imagens
          </button>
        </div>
      </div>
      <div className="FormButtons">
        <button type='button' className='bt bt-cancel'>Deletar</button>
        <button type='button' className='bt bt-primary'>Visualizar</button>
        <button type='submit' className='bt bt-approve'>{data ? 'Atualizar' : 'Cadastrar'}</button>
        <div className="productState">
          <div>
            <span>Status do produto</span>
            <p>{data ? data.product_state : ''}</p>
          </div>
          <div>
            <span>última atualização:</span>
            <p> {data ? data.updatedAt : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormButtonsAndAdv;
