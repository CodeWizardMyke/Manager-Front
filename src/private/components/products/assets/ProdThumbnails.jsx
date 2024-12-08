import React, { useContext, useState, useEffect } from 'react'
import './ProdThumbnails.css'
import { IoTrashBin } from "react-icons/io5";
import ProductCreateContext from '../../../context/ProductCreateContext';
import fetchAxios from '../../../axios/config';

function ProdThumbnails({data}) {
  const { thumbnails, setThumbnails, set_thumbnails_removed } = useContext(ProductCreateContext);
  const [indexImageView, setIndexImageView] = useState(null);
  const url_api = fetchAxios.defaults.baseURL.split('/api')[0]

  function handleImagesSelect(e) {
    const selectedFiles = Array.from(e.target.files);
    setThumbnails((prevImages) => [ ...prevImages, ...selectedFiles.map( (file) => ({file,type:0,path:null,fk_product_id:data.product_id}) ) ]);
  }

  function removeImage(element,index) {
    setThumbnails((prevImages) => prevImages.filter((_, i) => i !== index));
    if(!element.file){
      set_thumbnails_removed((item => [...item,element]))
    }
  }

  useEffect(() => {
    if(data){
      const {productThumbnails} = data;
      const filterTypeThumbnails = productThumbnails.filter( thumbnails => thumbnails.type === 0 );
      setThumbnails(filterTypeThumbnails);
    }
  }, [data,setThumbnails]); 

  return (
    <div className='wrapper_prod_thumbnails'>
      <div className="thumbnail_view">
        <span>selecione a imagem do produto</span>
        <div className="thumbnail_mg">
          {thumbnails.map((image) =>
            (
              image.thumbnail_id === indexImageView ? 
              (
                <img 
                  key={`imagem_atual-${image.thumbnail_id}`} 
                  src={ image.file instanceof File ? URL.createObjectURL(image.file) : url_api + image.path} 
                  alt="imagem atual selecionada" 
                />
              )
              : null
            ))}
        </div>
      </div>
      <div className="wrapper_thumbnails_list"  id='thumbnails'>
        <div className="thumbnail_list">
          <ul >
            {
              thumbnails.map((element,index) =>(
                <li key={'list_thumbnails'+ element.thumbnail_id +index}>
                  <div className="content_thumbnail_feature">
                    <button 
                      type='button' 
                      onClick={() => removeImage(element,index)}>
                      <IoTrashBin />
                    </button>

                    <img
                      src={element.file instanceof File ? URL.createObjectURL(element.file) : url_api + element.path}
                      alt={`imagem do produto ${element.thumbnail_id}`}
                      onClick={() => setIndexImageView(element.thumbnail_id)}
                    />
                  </div>
                </li>
              ) )
              }
          </ul>
        </div>
        <div className="select_thumbnails">
          <div className="check_image">
            <label htmlFor="use_thumbnail">exibir imagens</label>
            <input type="checkbox" name="use_thumbnail" id="use_thumbnail" defaultChecked />
          </div>
          <span>Selecione suas imagens</span>
          {thumbnails.length < 4 ? (
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
