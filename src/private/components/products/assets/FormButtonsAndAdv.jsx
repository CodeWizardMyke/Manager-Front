import React, { useEffect, useState } from 'react';
import './FormButtonsAndAdv.css';
import { IoTrashBin } from 'react-icons/io5';

function FormButtonsAndAdv() {
  const [imagesAdv, setImagesAdv] = useState([]);
  const [indexImageAdv, setIndexImageAdv] = useState(null);

  function handlerImagesAdv(e) {
    const imageSelected = Array.from(e.target.files);
    setImagesAdv((prevImage) => {
      const addedNewImage = [...prevImage, ...imageSelected];
      setIndexImageAdv(addedNewImage.length - 1);
      return addedNewImage;
    });
  }

  useEffect(() => {
  }, [imagesAdv, indexImageAdv]);

  
  function removeImageAdv(index) {
    setImagesAdv((prevImages) => {
      const imageRemoved = prevImages.filter((_, i) => i !== index);

      // Atualiza o index para null se não houver mais imagens
      if (imageRemoved.length === 0) {
        setIndexImageAdv(null);
      } else {
        setIndexImageAdv(Math.min(index, imageRemoved.length - 1));
      }

      return imageRemoved;
    });
  }

  function removeAllImagesAdv() {
    setImagesAdv([]);
    setIndexImageAdv(null);
  }

  return (
    <div className='FormButtonsAndAdv'>
      <div className="advertisingProduct">
        <div className="advThumbnail">
          {indexImageAdv !== null ? (
            <img src={URL.createObjectURL(imagesAdv[indexImageAdv])} alt="imagem selecionada" />
          ) : 'nenhuma imagem selecionada'}
        </div>
        <div className="advThumbnailList"> 
          <div>
            <ul>
              {imagesAdv.length > 0 && imagesAdv.map((image, index) => (
                <li 
                  key={`listAdv_${index}`}
                  className='wrapperAdvImage'
                  onClick={() => setIndexImageAdv(index)}
                >
                  <img src={URL.createObjectURL(image)} alt='imagem propaganda' />
                  <button className='btn_remove_img' onClick={() => removeImageAdv(index)}>
                    <IoTrashBin />
                  </button>
                </li>
              ))}

              {imagesAdv.length < 2 && (
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
        <button className='bt bt-cancel'>Deletar</button>
        <button className='bt bt-primary'>Visualizar</button>
        <button className='bt bt-approve '>Cadastrar</button>
        <div className="productState">
          <div>
            <span>Status do produto</span>
            <b>ativo</b>
          </div>
          <div>
            <span>última atualização</span>
            <b>00/00/0000</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormButtonsAndAdv;
