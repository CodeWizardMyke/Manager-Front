import React, { useContext, useEffect, useState } from 'react';
import './FormButtonsAndAdv.css';
import { IoTrashBin } from 'react-icons/io5';
import ProductCreateContext from '../../../context/ProductCreateContext';
import fetchAxios from '../../../axios/config';
const url_api = fetchAxios.defaults.baseURL.split('/api')[0];

function FormButtonsAndAdv({data}) {
  const { advertisings, setAdvertisings, set_thumbnails_removed} = useContext(ProductCreateContext);
  const [index, setIndex] = useState(null);

  function handlerImagesAdv(e) {
    let nextImage = Array.from(e.target.files);
    setAdvertisings((prevImage) => [...prevImage, ...nextImage.map( (file) => ( {file,type:1,path:null, fk_product_id:data.product_id} ) ) ]);
  }

  function removeImageAdv(element, index) {
    setAdvertisings((prevImages) => prevImages.filter((_, i) => i !== index));
    
    if(!element.file){
      set_thumbnails_removed((item => [...item,element]))
    }
    setIndex( null ); 
  }

  function removeAllImagesAdv() {
    setIndex(null);
    advertisings.map((element) => {
      if(!element.file){
       return set_thumbnails_removed((item => [...item,element]))
      }
      return null;
    })
    setAdvertisings([]);
  }

  useEffect(() => {
    if(data){
      const {productThumbnails} = data;
      const arrayFilted = productThumbnails.filter( thumbnails => thumbnails.type === 1 )
      setAdvertisings(arrayFilted);
    }
  }, [data, setAdvertisings]);

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          {
            advertisings.map((image,i) =>
            (
              i === index ?
              (
                <img 
                  src={
                    image.file instanceof File ? URL.createObjectURL(image.file) : url_api + image.path
                  } 
                  alt="imagem de propaganda" 
                  key={'advertising_show_image'+i+image.thumbnail_id}
                />
              )
              : null
            )
          )}
        </div>
        <div className="advThumbnailList">
          <div>
            <ul>
              {advertisings.length > 0 && advertisings.map((image, index) => (
                <li 
                  key={`advertising_list_${ index }`} 
                  className='wrapperAdvImage'
                >
                  <img
                    src={ 
                      image.file instanceof File ? URL.createObjectURL(image.file) : url_api+ image.path
                    } 
                    alt='imagem propaganda'
                    onClick={() => setIndex(index)}
                  />
                  <button type='button' className='btn_remove_img' onClick={() => removeImageAdv(image,index)}>
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
        <button type='submit' className='bt bt-approve'>{ data ? 'Atualizar' : 'Cadastrar' }</button>
        <div className="productState">
          <div>
            <span>Status do produto</span>
            <p>{data ? data.product_state : ''}</p>
          </div>
          <div>
            <span>última atualização:</span>
            <p> {data ? data.updatedAt : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormButtonsAndAdv;
