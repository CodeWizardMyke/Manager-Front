import React, { useEffect, useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { FaToggleOn } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoTrashBin } from 'react-icons/io5';

import './ImagesLayout.css';
import fetchAxios from '../../../axios/config';

function ImagesLayout({ DataContent, setImagesRemovedFromApi}) {
  const [images, setImages] = useState([]);
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);
  const [toggleList, setToggleList] = useState(true);

  // popular o aray atual com as imagens retornada da api
  useEffect(() => {
    if(DataContent){
      const arrImages = [];
      const BaseUrl = fetchAxios.defaults.baseURL.split("/api")[0]
      
      //separar thumbnail para usar nesse componente
      DataContent.thumbnails.forEach(e => {
        if(e.type === 0 && e.path){
          e.baseURL = BaseUrl;
         return arrImages.push(e);
        }; 
        return null;
      } );

      setImages(arrImages)
    }
  }, [DataContent]);

  function pushImage(e){
    let files = Array.from(e.target.files);
    setImages(old => {
      const updated = [...old, ...files];
      return updated;
    });
  }

  function clearImages(){
    setImages([]);
    setIndexCurrentImage(0);
  }


  function removeImage(event,index){
    event.stopPropagation(); // interrompe a propagação de um evento no DOM, impedindo que ele seja executado em elementos apais do elemento onde foi disparado.
    let newImages = images.filter( ( img, i ) => {
      if(typeof img === "object" && img.thumbnail_id){
        if(i == index){
          setImagesRemovedFromApi( old => [ ...old, img.thumbnail_id] );
        }
        return i !== index;
      }
      return i !== index;

    }); //filtra todas as imagens que o índice for diferente do índice que eu quero remover
    setImages(newImages);

    if(indexCurrentImage === index){
      setIndexCurrentImage(0);
    }
    else if(indexCurrentImage > index){
      setIndexCurrentImage( (oldIndex => oldIndex -1)); //se o índice da imagem atual for maior que o índice que eu quero remover, eu diminuo 1 do índice da imagem atual
    }
  }

  function checkImageIndex(element){
    
    if( element instanceof File ){
      return URL.createObjectURL(element);
    }

    if( typeof element === "object"){
      const getBaseUrl = element.baseURL ? element.baseURL + element.path : '';
      return getBaseUrl;
    }
    return null;
  }

  return (
    <div className='ImagesLayout'>
      <input type="number" defaultValue={images.length}  name='thumbnail_length' className='hidden'/>

      <button 
        type='button'
        className={ 'toggleImageList' + ( toggleList ? ' active' : '' ) }
        onClick={() => setToggleList(!toggleList)}
        ><FaToggleOn/></button>

      <div className="CurrentImage">
        <span className='image-caption'> Imagem do produto.</span>
        {images.length > 0  && <img 
          src={
            checkImageIndex(images[indexCurrentImage])
          }  /*URL.createObjectURL só serve para o front end para exibição da imagem , já que o back-end não vai aceitar como imagem, porque ele precisa dos bytes do File */
          alt="Imagem atual selecionada" 
        />}
        {
          !images.length > 0 && <div className="PhotoVideoICN"> <IoMdImages/> </div>
        }
      </div>
        {
          toggleList && (

            <div className="ImageLayoutSideL">
              <div className="ImageList">
                <ul>
                  {images.length >0 && images.map(
                    (item,index) => (
                      <li key={index} onClick={ () => setIndexCurrentImage(index) }>
                        <img 
                          src={ checkImageIndex(item)}
                          alt={`Imagem ${index}`} 
                        />
                        <button type='button' className='RemoveImage' onClick={ (event) => removeImage(event,index) }><IoTrashBin/></button>
                      </li>
                    )
                  ) }
                  {
                    !images.length > 0 && <li className='DarkList'><IoMdImages/></li>
                  }
                </ul>
              </div>
              <div className="ImageSelection">
                <label htmlFor="SetImageProduct" className='Add'><MdAddCircleOutline/></label>
                <label htmlFor="ClearImages" className='Clear'><FaRegTrashAlt/></label>
                <button 
                  type='button' 
                  id='ClearImages' 
                  className='hidden'
                  onClick={()=> clearImages()}
                ></button>
                <input
                    type="file"
                    name="thumbnails"
                    id="SetImageProduct"
                    className='hidden'
                    multiple //Usar Essa função par adicionar mais de uma imagem
                    accept="image/*" //Função para aceitar apenas imagens
                    onChange={pushImage} //Sempre que houver uma mudança nova atualize a lista de imagens
                />
              </div>
            </div>
          )
        }
    </div>
  )
}

export default ImagesLayout