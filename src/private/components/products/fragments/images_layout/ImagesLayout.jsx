import React, { useState } from 'react'
import './ImagesLayout.css'
import { MdAddCircleOutline } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { FaToggleOn } from "react-icons/fa";

function ImagesLayout() {
  const  [images, setImages] = useState([]);
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);
  const [toggleList, setToggleList] = useState(true);

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
    <div className='ImagesLayout'>

      <button 
        type='button'
        className={ 'toggleImageList' + ( toggleList ? ' active' : '' ) }
        onClick={() => setToggleList(!toggleList)}
        ><FaToggleOn/></button>

      <div className="CurrentImage">
        {images.length > 0  && <img 
          src={
            images[indexCurrentImage] instanceof File ? URL.createObjectURL(images[indexCurrentImage]) : null
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
                          src={
                            item instanceof File ? URL.createObjectURL(item) : null
                          }  /*URL.createObjectURL só serve para o front end para exibição da imagem , já que o back-end não vai aceitar como imagem, porque ele precisa dos bytes do File */
                          alt={`Imagem ${index}`} 
                        />
                        <button type='button' className='RemoveImage' onClick={ (event) => removeImage(event,index) }><FaRegTrashAlt/></button>
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