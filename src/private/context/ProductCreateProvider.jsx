import { useState } from "react";
import ProductCreateContext from "./ProductCreateContext";

function ProductCreateProvider ({children}) {
  const [thumbnails, setThumbnails] = useState([]);
  const [movieURL,setMovieURL] = useState('');
  const [advertisings, setAdvertisings] = useState([]);
  const [prodDel,setProdDel] = useState(false);
  const [prodView,setProdView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [thumbnails_removed, set_thumbnails_removed] = useState([]);

  const value ={
    thumbnails,setThumbnails,
    movieURL,setMovieURL,
    advertisings,setAdvertisings,
    unformatPrice,
    prodDel,setProdDel,
    prodView,setProdView,
    loading, setLoading,
    thumbnails_removed, set_thumbnails_removed
  }

  function unformatPrice(formattedPrice) {
    // Remova o símbolo de moeda e os pontos, substitua vírgula por ponto
    const numericValue = formattedPrice
      .replace(/[R$\s.]/g, '') // Remova "R$", espaços e pontos
      .replace(',', '.'); // Substitui vírgula por ponto e converta em float
    
    return parseFloat(numericValue);
  }

  return(
    <ProductCreateContext.Provider value={value}>
      {children}
    </ProductCreateContext.Provider>
  )
}

export default ProductCreateProvider;
