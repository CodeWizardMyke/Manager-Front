import React, { useContext, useEffect, useState } from 'react'
import './ProdThumbnails.css'
import { IoTrashBin } from "react-icons/io5";
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdThumbnails() {
  const {thumbnails,setThumbnails} = useContext(ProductCreateContext);

  const [indexImageView, setIndexImageView] = useState(null);

  function handleImagesSelect(e) {
    const selectedImages = Array.from(e.target.files);

    // Atualiza o estado de imagens e define o último índice para exibir a última imagem adicionada
    setThumbnails(prevImages => {
      const updatedImages = [...prevImages, ...selectedImages];
      setIndexImageView(updatedImages.length - 1); // Define o índice da última imagem
      return updatedImages;
    });
  }

  function removeImageByIndex(index) {
    const updatedImages = thumbnails.filter((_, i) => i !== index);
    setIndexImageView(updatedImages.length > 0 ? Math.min(index, updatedImages.length - 1) : null);
    setThumbnails(updatedImages);
  }
  
  useEffect(() => {
    if(!thumbnails.length){

      document.querySelector('.thumbnail_mg').innerHTML = ""
      
    }else{
      document.querySelector('.thumbnail_mg').innerHTML = ""
      const image_container = document.querySelector('.thumbnail_mg')
      let tagImg = document.createElement('img')
      let getImgSelected = thumbnails[indexImageView]
      let imageCreated = URL.createObjectURL(getImgSelected)

      tagImg.src = imageCreated;
      tagImg.title = 'imagem atual selecionada!'

      image_container.appendChild(tagImg)
    }
  },[thumbnails,indexImageView])

  return (
    <div className='wrapper_prod_thumbnails'>
      <div className="thumbnail_view">
        <span>Imagem principal do produto</span>
        <div className="thumbnail_mg"></div>
      </div>
      <div className="wrapper_thumbnails_list">
          <div className="thumbnail_list">
            <ul>
              {
                thumbnails.map( (image,index) => (
                  <li key={'img_'+index}>
                    <div className="content_thumbnail_feature">
                      <button onClick={() => removeImageByIndex(index)} ><IoTrashBin/></button>
                      <img src={URL.createObjectURL(image)} alt={`imagem ${index +1 }`} onClick={() => setIndexImageView(index)} />
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="select_thumbnails" >
            <div className="check_image">
              <label htmlFor="use_thumbnail">exibir imagens</label>
              <input type="checkbox" name="use_thumbnail" id="use_thumbnail" defaultChecked />
            </div>
            <span>Selecione suas imagems</span>
            {
              thumbnails.length < 6 ? (<button className='bt_add_thumbnail'>  <label htmlFor="file_thumbnails">Adicionar</label> </button>) : "Limite maximo atingido!"
            }
            <input type="file"
              id="file_thumbnails"
              multiple className='hideElement'
              onChange={handleImagesSelect}
              accept="image/*"
            />
          </div>
      </div>
    </div>
  )
}

export default ProdThumbnails