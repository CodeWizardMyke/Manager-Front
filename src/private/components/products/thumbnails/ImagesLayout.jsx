import React, { useEffect, useState } from 'react'
import { MdAddCircleOutline } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { FaToggleOn } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoTrashBin } from 'react-icons/io5';

import './ImagesLayout.css';
import fetchAxios from '../../../axios/config';

function ImagesLayout({ DataContent, setThumbnails, thumbnails, setRemoveFromApi }) {
  const [toggleList, setToggleList] = useState(true);
  const [indexCurrentImage, setIndexCurrentImage] = useState(0);


  // CARREGAR IMAGENS DA API
  useEffect(() => {
    if (!DataContent) return;

    const BaseUrl = fetchAxios.defaults.baseURL.split("/api")[0];

    const arrImages = DataContent.thumbnails
      .filter(img => img.type === 0 && img.path)
      .map(img => ({
        ...img,
        preview: BaseUrl + img.path, 
        fromApi: true
      }));

    setThumbnails(arrImages);

  }, [DataContent]);


  // ADICIONAR IMAGENS DO INPUT
  function pushImage(e) {
    const files = Array.from(e.target.files);

    const newImage = files.map(file => ({
      file,
      preview: URL.createObjectURL(file), // preview REAL
      fromApi: false
    }));

    setThumbnails(old => [...old, ...newImage]);
  }

  // REMOVER IMAGEM
  function removeImage(event, index) {
    event.stopPropagation();

    const removed = thumbnails[index];

    if (removed?.fromApi && removed.thumbnail_id) {
      setRemoveFromApi(old => [...old, removed.thumbnail_id]);
    }

    setThumbnails(old => old.filter((_, i) => i !== index));

    if (indexCurrentImage === index) setIndexCurrentImage(0);
    else if (indexCurrentImage > index) setIndexCurrentImage(i => i - 1);
  }

  // FUNÇÃO SEGURA PARA PEGAR PREVIEW
  function getPreview(img) {
    return img?.preview || null;
  }

  return (
    <div className='ImagesLayout'>
      <button
        type='button'
        className={'toggleImageList' + (toggleList ? ' active' : '')}
        onClick={() => setToggleList(!toggleList)}
      >
        <FaToggleOn />
      </button>

      <div className="CurrentImage">
        <span className='image-caption'>Imagem do produto</span>

        {thumbnails.length > 0 ? (
          <img src={getPreview(thumbnails[indexCurrentImage])} alt="Imagem atual" />
        ) : (
          <div className="PhotoVideoICN"><IoMdImages /></div>
        )}
      </div>

      {toggleList && (
        <div className="ImageLayoutSideL">
          <div className="ImageList">
            <ul>
              {thumbnails.length > 0 ? (
                thumbnails.map((item, index) => (
                  <li key={index} onClick={() => setIndexCurrentImage(index)}>
                    <img src={getPreview(item)} alt="" />
                    <button
                      type='button'
                      className='RemoveImage'
                      onClick={(ev) => removeImage(ev, index)}
                    >
                      <IoTrashBin />
                    </button>
                  </li>
                ))
              ) : (
                <li className='DarkList'><IoMdImages /></li>
              )}
            </ul>
          </div>

          <div className="ImageSelection">
            <label htmlFor="SetImageProduct" className='Add'>
              <MdAddCircleOutline />
            </label>

            <label htmlFor="ClearImages" className='Clear'>
              <FaRegTrashAlt />
            </label>

            <button id='ClearImages' type='button' className='hidden'
              onClick={() => setThumbnails([])}
            ></button>

            <input
              type="file"
              id="SetImageProduct"
              name="thumbnails"
            accept="image/*"
              className="hidden"
              onChange={pushImage}
            />
          </div>
        </div>
      )}
    </div>
  );
}


export default ImagesLayout