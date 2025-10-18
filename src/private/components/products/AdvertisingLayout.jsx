import React, { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";

import './AdvertisingLayout.css';

import { MdAddCircleOutline } from "react-icons/md";
import { IoMdImages } from "react-icons/io";

function AdvertisingLayout() {
  const  [images, setImages] = useState([]);
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);
  const [toggleListAdv, setToggleListAdv] = useState(true);

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

  function checkImageIndex(element){
    let eChecked = element instanceof File ? URL.createObjectURL(element) : null;
    return eChecked;
  }

  return (
    <div className='ContentAdvertisingLayout'>
      <div className="AdvertisingContainer">
        <button 
          type='button'
          className={ 'toggleImageList' + ( toggleListAdv ? ' active' : '' ) }
          onClick={() => setToggleListAdv(!toggleListAdv)}
          ><FaToggleOn/></button>
        <div className="advThumbnail">
          { 
            images.length > 0 ? (
             <img src={ checkImageIndex(images[indexCurrentImage]) } alt="Imagem promoçional do produto" />
            ) : <div className="PhotoVideoICN"> <IoMdImages/> </div>
          }
        </div>
          {
            toggleListAdv && (
            <div className="advImagesList">
              <ul>
                { images.length === 0 && <li className="PhotoVideoICN"> <IoMdImages/> </li> }
                { images.length > 0 &&
                  (
                    images.map( (img,index) => (
                      <li key={"id_Adv:"+index} onClick={ () => setIndexCurrentImage(index) }>
                        <img  src={ checkImageIndex(img) } alt={`Imagem ${index}`} />
                        <button type='button' onClick={ (event) => removeImage(event,index) }><IoTrashBin/></button>
                      </li>
                    ))
                  )
                }
                {
                  images.length === 2 && ( <label htmlFor="setImagesAdv">Quantidade maxima</label>)
                }
              </ul>
              <div className="content-buttons-adv">
                <label htmlFor={ images.length <2 ? "setImagesAdv" :"" }   className="Add" ><MdAddCircleOutline/></label>
                <label htmlFor="clearImagesAdv"className="Clear"><FaRegTrashAlt/></label>
                <input
                  type="file"
                  name="thumbnails"
                  id="setImagesAdv"
                  className='hidden'
                  multiple //Usar Essa função par adicionar mais de uma imagem
                  accept="image/*" //Função para aceitar apenas imagens
                  onChange={pushImage} //Sempre que houver uma mudança nova atualize a lista de imagens
                />
                <button 
                  type='button' 
                  id='clearImagesAdv' 
                  className='hidden'
                  onClick={()=> clearImages()}>
                </button>
              </div>
            </div>
            )
          }
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
