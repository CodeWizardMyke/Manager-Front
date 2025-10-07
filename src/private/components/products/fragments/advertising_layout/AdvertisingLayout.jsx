import React, { useState } from 'react';
import './AdvertisingLayout.css';
import { IoTrashBin } from 'react-icons/io5';

function AdvertisingLayout() {
 const  [images, setImages] = useState([]);
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);

  function pushImage(element){
    let CurrentFiles = Array.from(element.target.files);

    setImages( ( oldImages) => [ ...oldImages, ...CurrentFiles.map( files => files ) ] )
  }

  function clearImages(){
    setImages([]);
    setIndexCurrentImage(0);
  }

  function removeImage(event,index){
    event.stopPropagation(); // interrompe a propagação de um evento no DOM, impedindo que ele seja executado em elementos apais do elemento onde foi disparado.
    let newImages = images.filter( ( img, i ) => i !== index); //filtra todas as imagens que o índice for diferente do índice que eu quero remover
    setImages(newImages);

    if(indexCurrentImage === index){
      setIndexCurrentImage(0);
    }
    else if(indexCurrentImage > index){
      setIndexCurrentImage( (oldIndex => oldIndex -1)); //se o índice da imagem atual for maior que o índice que eu quero remover, eu diminuo 1 do índice da imagem atual
    }
  }

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          { 
            images.length > 0 && (
             <img src={ images[indexCurrentImage] instanceof File ? URL.createObjectURL(images[indexCurrentImage]) : null} alt="Imagem promoçional do produto" />
            )
          }
        </div>
        <div className="advThumbnailList">
          <div>
            <ul>
              {images.length >0 && images.map(
                (item,i) => (
                  <li className='wrapperAdvImage'  key={i} onClick={ () => setIndexCurrentImage(i) }>
                    <img 
                      src={
                        item instanceof File ? URL.createObjectURL(item) : null
                      }  /*URL.createObjectURL só serve para o front end para exibição da imagem , já que o back-end não vai aceitar como imagem, porque ele precisa dos bytes do File */
                      alt={`Imagem ${i}`} 
                    />
                    <button type='button' className='btn_remove_img' onClick={ (event) => removeImage(event,i) }><IoTrashBin/></button>
                  </li>
                )
              ) }
              {images.length < 2 && (
                <li className='wrapperAdvImage'>
                  <label htmlFor="add">+</label>
                  <input 
                    type="file" 
                    id="add" 
                    multiple
                    accept='image/*'
                    onChange={pushImage}
                  />
                </li>
              )}
            </ul>
          </div>
          <button type='button' className="advRemoveThumbnails" onClick={() => clearImages()}>Remover Imagens</button>
        </div>
      </div>
      <div className="FormButtons">
        <button type='button' className='bt bt-cancel'>Deletar</button>
        <button type='button' className='bt bt-primary'>Visualizar</button>
        <button type='submit' className='bt bt-approve'>Cadastrar</button>
      </div>
    </div>
  );
}

export default AdvertisingLayout;
