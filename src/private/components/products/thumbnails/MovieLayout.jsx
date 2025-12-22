import React, { useEffect, useState } from 'react';
import { BiSolidMoviePlay } from "react-icons/bi";
import './MovieLayout.css';

function MovieLayout({ DataContent, clearFields,setClearFields, setMovieRemoved }) {
  const [movieURL, setMovieURL] = useState('');
  const [showMovie, setShowMovie] = useState(false);

  useEffect(() => {
    if (DataContent?.movie_url) {
      setMovieURL(DataContent.movie_url);
      setShowMovie(true);
    }
  }, [DataContent]);

  useEffect(() => {
    if(clearFields && clearFields !== null){
      setMovieURL('');
      setShowMovie(false);
      setClearFields(false);
    }
  }, [clearFields,setClearFields]);

  function removeMovie() {
    if(DataContent?.movie_url){
      setMovieRemoved(true);
    }
    setMovieURL('');
    setShowMovie(false);
  }

  function handleMovieURL(e) {
    const url = convertYouTubeUrl(e.target.value);
    setMovieURL(url);
  }

  function convertYouTubeUrl(url) {
    const pattern = "watch?v=";
    const embedPattern = "/embed/";
    return url.includes(pattern) ? url.replace(pattern, embedPattern) : url;
  }

  return (
    <div className='movie_container'>
      <div className="setMovie">
        <div className="movie_url">
          <label htmlFor="movie_url">Endereço do vídeo</label>
          <input
            type="url"
            name="movie_url"
            id="movie_url"
            placeholder="https://exemplo.com/video"
            value={movieURL}
            onChange={handleMovieURL}
          />
        </div>

        <div className='movie_check_field'>
          <div className='content_check'>
            <label htmlFor="movie_catalog">Exibir vídeo</label>
            <input
              type="checkbox"
              name="movie_catalog"
              id="movie_catalog"
              checked={showMovie}
              onChange={(e) => setShowMovie(e.target.checked)}
            />
          </div>

          <button
            type="button"
            className="bt btn-remove"
            onClick={removeMovie}
          >
            Remover vídeo
          </button>
        </div>
      </div>

      <div className="movie_preview">
        {!movieURL && <BiSolidMoviePlay />}
        {movieURL && showMovie && (
          <iframe
            src={movieURL}
            frameBorder="0"
            allowFullScreen
            title="Vídeo do produto"
          ></iframe>
        )}
      </div>
    </div>
  );
}

export default MovieLayout;
