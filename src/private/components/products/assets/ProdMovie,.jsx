import React, { useState } from 'react'
import './ProdMovie.css'

function ProdMovie() {
  const [movieUrl, setMovieUrl] = useState('');

  function removeMovie() {
    setMovieUrl('');
    document.querySelector('#movie_url').value = ''
  }

  return (
    <div className='wrapper_prod_movie'>
      <div className="prod_movie_settings">
        <div className="movie_url_field">
          <label htmlFor="movie_url">URL do vídeo</label>
          <textarea name="movie_url" id="movie_url" cols={27} rows={7} onChange={(e) => setMovieUrl(e.target.value)} ></textarea>
        </div>
        <div className='movie_check_field'>
          <label htmlFor="movie_catalog">Exibir video no catálogo</label>
          <input type="checkbox" name="movie_catalog" id="movie_catalog" defaultChecked />
        </div>
        <button className='bt btn-remove' onClick={removeMovie}>Remover vídeo</button>
      </div>
      <div className="wrapper_movie">
      <iframe
        src={movieUrl}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      </div>
    </div>
  )
}

export default ProdMovie