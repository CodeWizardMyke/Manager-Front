import React, { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaToggleOn } from "react-icons/fa";

import './AdvertisingLayout.css';

import { MdAddCircleOutline } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import fetchAxios from '../../../axios/config';

function AdvertisingLayout({setAdvertising, advertising, setViewProduct, viewProduct, DataContent, updateProduct, setRemoveFromApi}) {
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);
  const [toggleListAdv, setToggleListAdv] = useState(true);

  React.useEffect(() => {
    if (!DataContent) return;

    const BaseUrl = fetchAxios.defaults.baseURL.split("/api")[0];

    const arrImages = DataContent.thumbnails
      .filter(img => img.type === 1 && img.path)
      .map(img => ({
        ...img,
        preview: BaseUrl + img.path, 
        fromApi: true
      }));

    setAdvertising(arrImages);

  }, [DataContent,setAdvertising]);


  function pushImage(e) {
    const files = Array.from(e.target.files);

    const newImage = files.map(file => ({
      file,
      preview: URL.createObjectURL(file), // preview REAL
      fromApi: false
    }));

    setAdvertising(old => [...old, ...newImage]);
  }

  function clearImages(){
    setAdvertising([]);
    setIndexCurrentImage(0);
  }

  function removeImage(event, index) {
    event.stopPropagation();

    const removed = advertising[index];

    if (removed?.fromApi && removed.thumbnail_id) {
      setRemoveFromApi(old => [...old, removed.thumbnail_id]);
    }

    setAdvertising(old => old.filter((_, i) => i !== index));

    if (indexCurrentImage === index) setIndexCurrentImage(0);
    else if (indexCurrentImage > index) setIndexCurrentImage(i => i - 1);
  }

  function getPreview(img) {
    return img?.preview || null;
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
            advertising.length > 0 ? (
             <img src={ getPreview(advertising[indexCurrentImage]) } alt="Imagem promoçional do produto" />
            ) : <div className="PhotoVideoICN"> <IoMdImages/> </div>
          }
          <div className='image-caption'>Propaganda do produto.</div>
        </div>
          {
            toggleListAdv && (
            <div className="advImagesList">
              <ul>
                { advertising.length === 0 && <li className="PhotoVideoICN"> <IoMdImages/> </li> }
                { advertising.length > 0 &&
                  (
                    advertising.map( (img,index) => (
                      <li key={"id_Adv:"+index} onClick={ () => setIndexCurrentImage(index) }>
                        <img  src={ getPreview(img) } alt={`Imagem ${index}`} />
                        <button type='button' onClick={ (event) => removeImage(event,index) }><IoTrashBin/></button>
                      </li>
                    ))
                  )
                }
                {
                  advertising.length === 2 && ( <label htmlFor="setImagesAdv">Quantidade maxima</label>)
                }
              </ul>
              <div className="content-buttons-adv">
                <label htmlFor={ advertising.length <2 ? "setImagesAdv" :"" }   className="Add" ><MdAddCircleOutline/></label>
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
        <button type='button' className='bt bt-primary' onClick={()=> setViewProduct(!viewProduct)}>Visualizar</button>
        <button 
          type='button'
          className='bt bt-orange'
          onClick={updateProduct}
        >Atualizar</button>
        <button type='submit' className='bt bt-approve'>Cadastrar</button>
      </div>

    </div>
  );
}

export default AdvertisingLayout;
