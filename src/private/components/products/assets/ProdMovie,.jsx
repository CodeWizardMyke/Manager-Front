import React, { useContext, useEffect } from 'react'
import './ProdMovie.css'
import ProductCreateContext from '../../../context/ProductCreateContext';

function ProdMovie({data}) {
  const {movieURL,setMovieURL} = useContext(ProductCreateContext);

  function removeMovie() {
    setMovieURL('');
    document.querySelector('#movie_url').value = ''
  }

  function handleMovieURL(e) {
    const url = convertYouTubeUrl(e.target.value);
    setMovieURL(url);
  }

  function convertYouTubeUrl(url) {
    const pattern = "watch?v=";
    const embedPattern = "/embed/";

    // Verifica se a URL contém "watch?v=" logo após ".com/"
    if (url.includes(pattern)) {
        return url.replace(pattern, embedPattern);
    }

    // Retorna a URL inalterada se "watch?v=" não estiver presente
    return url;
  }

  useEffect(()=> {
    if( data &&  data.movie_url !== ''){
      setMovieURL(data.movie_url)
    }
  },[data,setMovieURL])

  return (
    <div className='wrapper_prod_movie'>
      <div className="prod_movie_settings">
        <div className="movie_url_field">
          <label htmlFor="movie_url">URL do vídeo</label>
          <textarea name="movie_url" id="movie_url" cols={27} rows={7} onChange={handleMovieURL} ></textarea>
        </div>
        <div className='movie_check_field'>
          <label htmlFor="movie_catalog">Exibir video no catálogo</label>
          <input type="checkbox" name="movie_catalog" id="movie_catalog"  />
        </div>
        <button className='bt btn-remove' onClick={removeMovie}>Remover vídeo</button>
      </div>
      <div className="wrapper_movie">
        <iframe src={movieURL} frameBorder="0" allowFullScreen title='Vídeo do produto'></iframe>
      </div>
    </div>
  )
}

export default ProdMovie