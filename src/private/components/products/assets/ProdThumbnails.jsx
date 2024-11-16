import React, { useContext, useState, useEffect } from 'react'
import './ProdThumbnails.css'
import { IoTrashBin } from "react-icons/io5";
import ProductCreateContext from '../../../context/ProductCreateContext';
import fetchAxios from '../../../axios/config';

function ProdThumbnails({data}) {
  const { thumbnails, setThumbnails } = useContext(ProductCreateContext);
  const [indexImageView, setIndexImageView] = useState(null);
  const url_api = fetchAxios.defaults.baseURL
  const url_def = url_api.split('/api')[0];

  // Handle image selection and update state
  function handleImagesSelect(e) {
    const selectedImages = Array.from(e.target.files);

    setThumbnails(prevImages => {
      const updatedImages = [...prevImages, ...selectedImages];
      return updatedImages; 
    });
  }

  // Remove image by index and update the image view index
  function removeImageByIndex(index) {
    const updatedImages = thumbnails.filter((_, i) => i !== index);
    setIndexImageView(updatedImages.length > 0 ? Math.min(index, updatedImages.length - 1) : null);
    setThumbnails(updatedImages);
  }

  useEffect(() => {
    if(data){
      const arrayImages = JSON.parse(data)

      const arrayFilterd = arrayImages.filter(element => element.isAdvertising !==1)
      const updatedImages = arrayFilterd.map( element => url_def + element.locail)

      setThumbnails(updatedImages)
      if(updatedImages.length > 0){
        setIndexImageView(1)
      }
    }

    if (thumbnails.length > 0) {
      setIndexImageView(thumbnails.length - 1); 
    }
  }, [data,setThumbnails,url_def,thumbnails.length]); 

  return (
    <div className='wrapper_prod_thumbnails'>
      <div className="thumbnail_view">
        <span>Imagem principal do produto</span>
        <div className="thumbnail_mg">
          {thumbnails.map((image, index) => {
            return index === indexImageView ? (
              <img key={`imagem_atual-${index}`} src={typeof image === 'object' ? URL.createObjectURL(image) : image} alt="imagem atual selecionada" />
            ) : null;
          })}
        </div>
      </div>
      <div className="wrapper_thumbnails_list"  id='thumbnails'>
        <div className="thumbnail_list">
          <ul >
            {thumbnails.map((image, index) => (
              <li key={'img_' + index}>
                <div className="content_thumbnail_feature">
                  <button type='button' onClick={() => removeImageByIndex(index)}>
                    <IoTrashBin />
                  </button>
                  <img
                    src={typeof image === 'object' ? URL.createObjectURL(image) : image} 
                    alt={`imagem ${index + 1}`} 
                    onClick={() => setIndexImageView(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="select_thumbnails">
          <div className="check_image">
            <label htmlFor="use_thumbnail">exibir imagens</label>
            <input type="checkbox" name="use_thumbnail" id="use_thumbnail" defaultChecked />
          </div>
          <span>Selecione suas imagens</span>
          {thumbnails.length < 6 ? (
            <button type='button' className='bt_add_thumbnail'>
              <label htmlFor="file_thumbnails">Adicionar</label>
            </button>
          ) : (
            "Limite maximo atingido!"
          )}
          <input
            type="file"
            id="file_thumbnails"
            multiple
            className='hideElement'
            onChange={handleImagesSelect}
            accept="image/*"
          />
        </div>
      </div>
    </div>
  );
}

export default ProdThumbnails;
