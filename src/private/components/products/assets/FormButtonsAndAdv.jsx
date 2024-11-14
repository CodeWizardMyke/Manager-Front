import React, { useContext, useEffect, useState } from 'react';
import './FormButtonsAndAdv.css';
import { IoTrashBin } from 'react-icons/io5';
import ProductCreateContext from '../../../context/ProductCreateContext';

function FormButtonsAndAdv() {
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
    if (advertisings.length > 0) {
      setIndex(advertisings.length - 1); 
    }
  }, [advertisings]); 

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          {advertisings.length > 0 && index !== null && (
            <img 
              src={URL.createObjectURL(advertisings[index])} 
              alt="imagem atual da propaganda" 
            />
          )}
        </div>
        <div className="advThumbnailList">
          <div>
            <ul>
              {advertisings.length > 0 && advertisings.map((image, index) => (
                <li key={`listAdv_${index}`} className='wrapperAdvImage'>
                  <img
                    src={URL.createObjectURL(image)}
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
        <button type='submit' className='bt bt-approve'>Cadastrar</button>
        <div className="productState">
          <div>
            <span>Status do produto</span>
          </div>
          <div>
            <span>última atualização</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormButtonsAndAdv;
