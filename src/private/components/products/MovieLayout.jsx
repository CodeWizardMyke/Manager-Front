import React, { useEffect, useState } from 'react';
import { BiSolidMoviePlay } from "react-icons/bi";

import './MovieLayout.css';

function MovieLayout({data}) {
  const [movieURL,setMovieURL] = useState('')

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
    <div className='movie_container'>
      <div className="setMovie">

        <div className="movie_url">

          <label htmlFor="movie_url">Endereço virutal do vídeo</label>
          <input type="url" name="movie_url" id="movie_url" placeholder='https://exemplo.com/video'  onChange={handleMovieURL}/>

        </div>

        <div className='movie_check_field'>

          <div className='content_check'>
            <label htmlFor="movie_catalog">Exibir video</label>
            <input type="checkbox" name="movie_catalog" id="movie_catalog"  />
          </div>
          <button type='button' className='bt btn-remove' onClick={removeMovie}>Remover vídeo</button>

        </div>


      </div>
      <div className="movie_preview">
        {
          !movieURL && <BiSolidMoviePlay/>
        }
        {
          movieURL && <iframe src={movieURL} frameBorder="0" allowFullScreen title='Vídeo do produto'></iframe>
        }
      </div>
    </div>
  )
}

export default MovieLayout