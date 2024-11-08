import React, { useContext } from 'react'
import './ProdMovie.css'
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdMovie() {
  const {movieURL,setMovieURL} = useContext(ProductCreateContext);

  function removeMovie() {
    setMovieURL('');
    document.querySelector('#movie_url').value = ''
  }

  return (
    <div className='wrapper_prod_movie'>
      <div className="prod_movie_settings">
        <div className="movie_url_field">
          <label htmlFor="movie_url">URL do vídeo</label>
          <textarea name="movie_url" id="movie_url" cols={27} rows={7} onChange={(e) => setMovieURL(e.target.value)} ></textarea>
        </div>
        <div className='movie_check_field'>
          <label htmlFor="movie_catalog">Exibir video no catálogo</label>
          <input type="checkbox" name="movie_catalog" id="movie_catalog" defaultChecked />
        </div>
        <button className='bt btn-remove' onClick={removeMovie}>Remover vídeo</button>
      </div>
      <div className="wrapper_movie">
        <iframe src={movieURL} frameborder="0" title='movieProduct'> </iframe>
      </div>
    </div>
  )
}

export default ProdMovie