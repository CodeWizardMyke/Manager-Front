import React, { useState } from 'react'
import SearchProductsAddCart from './SearchProductsAddCart';

function CreateCart() {

  const [dataCart, setDataCart] = useState([]);
  const [dataClient, setDataClient] = useState(null);
  const [cartMount, setCartMount] = useState(null);
  const [navigate, setNavivate] = useState('products');
  
  return (
    <>
      {
        navigate === 'products' && (
          <SearchProductsAddCart
            dataCart={dataCart} setDataCart={setDataCart}
            navigate={navigate} setNavivate={setNavivate}
          />
        )
      }
    </>
  )
}

export default CreateCart