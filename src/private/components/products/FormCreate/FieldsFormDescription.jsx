import React, { useState } from 'react'

import './FieldsFormDescription.css'

function FieldsFormDescription() {
  const [imgSelect, setImgSelect] = useState(null);

  function thumbnailsHanddler(e){
    const file = e.target.files[0];
    if (file) {
     const reader = new FileReader();
      reader.onload = () => {
        setImgSelect(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }


  return (
    <>
      <div className="form-group w-100 ">
      <label htmlFor="discribe">Descrição:</label>
        <textarea id="discribe" name="discribe" rows={10} placeholder='Detalhes técnicos do produto.' />
        <div className="error errors-discribe"></div>
      </div>
        
      <div className="custom-input-file">
        <button type='button' className='bt bt-file'>
          <label htmlFor="thumbnails">Enviar Imagem</label>
        </button>
        <div className='content-input-file'>
          <input type="file" name="thumbnails" id="thumbnails" onChange={ thumbnailsHanddler } />
          <div className="error errors-thumbnails"></div>
        </div>

        <div className="wrapper-images">
            <span className="wrapper-images-title">Imagem do Produto:</span>
            {imgSelect ?(
              <div className="images">
                <img src={imgSelect} alt="Imagem selecionada" />
              </div>
            ) : "Nenuhma imagem Selecionada!"}
        </div>
      </div>

      
    </>
  )
}

export default FieldsFormDescription;