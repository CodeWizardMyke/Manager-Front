import React, { useContext,useState } from 'react';
import './FormButtonsAndAdv.css';
import { IoTrashBin } from 'react-icons/io5';
import ProductCreateContext from '../../../context/ProductCreateContext';

function FormButtonsAndAdv() {
  const {advertisings,setAdvertisings} = useContext(ProductCreateContext);
  const [index, setIndex] = useState(null);

  function handlerImagesAdv(e) {
    let nextImage = Array.from(e.target.files);
    setAdvertisings((prevImage) => [...prevImage, ...nextImage] );
    setIndex(advertisings.length);
  }

  function removeImageAdv(index) {
    setAdvertisings((prevImages) => prevImages.filter((_, i) => i !== index));
    if(advertisings.length > 1){
      setIndex(index -1)
    }else{
      setIndex(null);
    }
  }

  function removeAllImagesAdv() {
      setIndex(null);
      setAdvertisings([]);
  }

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          {
            index !== null ? <img src={URL.createObjectURL(advertisings[index])} alt="imagem selecionada" /> : "Nenhuma imagem selecionada!"
          }
        </div>
        <div className="advThumbnailList"> 
          <div>
            <ul>
              {advertisings.length > 0 && advertisings.map((image, index) => (
                <li 
                  key={`listAdv_${index}`}
                  className='wrapperAdvImage'
                >
                  <img src={URL.createObjectURL(image)} alt='imagem propaganda' onClick={() => setIndex(index)} />
                  <button type='button' className='btn_remove_img' onClick={() => removeImageAdv(index)}>
                    <IoTrashBin />
                  </button>
                </li>
              ))}

              {advertisings.length < 2 && (
                <li className='wrapperAdvImage'>
                  <label htmlFor="adv_1">+</label>
                  <input type="file" name="adv_1" id="adv_1" onChange={handlerImagesAdv} />
                </li>
              )}
            </ul>
          </div>
          <button className="advRemoveThumbnails" onClick={removeAllImagesAdv}>
            Remover Imagens
          </button>
        </div>
      </div>
      <div className="FormButtons">
        <button type='button' className='bt bt-cancel'>Deletar</button>
        <button type='button' className='bt bt-primary'>Visualizar</button>
        <button type='submit' className='bt bt-approve'>Cadastrar</button>
        <div className="productState">
          <div>
            <span>Status do produto</span>
          </div>
          <div>
            <span>última atualização</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormButtonsAndAdv;
