import { useState } from "react";
import ProductCreateContext from "./ProductCreateContext";

function ProductCreateProvider ({children}) {
  const [loading, setLoading] = useState(false);

  const children = {
    loading, setLoading,
  }
  
  return(
    <ProductCreateContext.Provider value={value}>
      {children}
    </ProductCreateContext.Provider>
  )
}

export default ProductCreateProvider;
