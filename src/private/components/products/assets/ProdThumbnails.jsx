import React, { useState } from 'react'
import './ProdThumbnails.css'
import { IoTrashBin } from "react-icons/io5";

function ProdThumbnails() {
  const [images, setImages] = useState([])
  const [indexImageView, setIndexImageView] = useState(null);

  function handleImagesSelect(e) {
    const selectedImages = Array.from(e.target.files);

    // Atualiza o estado de imagens e define o último índice para exibir a última imagem adicionada
    setImages(prevImages => {
      const updatedImages = [...prevImages, ...selectedImages];
      setIndexImageView(updatedImages.length - 1); // Define o índice da última imagem
      return updatedImages;
    });
  }

  function removeImageByIndex(index) {
    // Cria um novo array filtrando a imagem com indicie igual ao passsado por parâmetro
    const updatedImages = images.filter((_, i) => i !== index);
    
    // Atualiza o estado de imagens
    setImages(updatedImages);
  
    // atualiza a imagem em exibição, se tiver item no array, entao busco uma imagem com indicie valido usando Math.min, entre o index removido e o tamanho do array, caso nao tenha um valor valido preencha com valor nulo
    setIndexImageView(updatedImages.length > 0 ? Math.min(index, updatedImages.length - 1) : null);
  }
  return (
    <div className='wrapper_prod_thumbnails'>
      <div className="thumbnail_view">
        <span>Imagem principal do produto</span>
        <div className="thumbnail_mg">
          {
            indexImageView !== null && <img src={URL.createObjectURL( images[indexImageView] )} alt="Imagem autal selecionada" />
          }
        </div>
      </div>
      <div className="wrapper_thumbnails_list">
          <div className="thumbnail_list">
            <ul>
              {
                images.map( (image,index) => (
                  <li key={'img_'+index}>
                    <div className="content_thumbnail_feature">
                      <button onClick={() => removeImageByIndex(index,image)} ><IoTrashBin/></button>
                      <img src={URL.createObjectURL(image)} alt={`imagem ${index +1 }`} onClick={() => setIndexImageView(index)} />
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          <div className="select_thumbnails">
            <span>Selecione suas imagems</span>
            {
              images.length < 6 ? (<button className='bt_add_thumbnail'>  <label htmlFor="file_thumbnails">Adicionar</label> </button>) : "Limite maximo atingido!"
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