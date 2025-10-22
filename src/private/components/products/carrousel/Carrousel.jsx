import React, { useState } from "react";

function Carrousel({ images = [], title = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="carrousel-empty">
        <p>Nenhuma imagem disponível</p>
      </div>
    );
  }

  function getImageSrc(img) {
    if (img instanceof File) return URL.createObjectURL(img);
    return img;
  }

  function nextImage() {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  function prevImage() {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  const nextIndex = (currentIndex + 1) % images.length;
  const prevIndex = (currentIndex - 1 + images.length) % images.length;

  return (
    <div className="top_container_carrousel">
      {title && <div className="carrousel-title">{title}</div>}

      <div className="carrousel-product">
        <div className="carrousel-left" onClick={prevImage}>
          <img
            src={getImageSrc(images[prevIndex])}
            alt="Imagem anterior"
          />
        </div>

        <div className="carrousel-current">
          <img
            src={getImageSrc(images[currentIndex])}
            alt="Imagem atual"
          />
        </div>

        <div className="carrousel-right" onClick={nextImage}>
          <img
            src={getImageSrc(images[nextIndex])}
            alt="Próxima imagem"
          />
        </div>
      </div>
    </div>
  );
}

export default Carrousel;
