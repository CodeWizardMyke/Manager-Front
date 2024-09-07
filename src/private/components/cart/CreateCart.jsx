import React, { useState } from 'react';
import SearchProductsAddCart from './SearchProductsAddCart';

function CreateCart() {
  const [loading, setLoading] = useState(false);
  const [navigate, setNavivate] = useState('products');
  const [productsData, setProductsData] = useState([]);
  const [clientData, setClientData] = useState(null);

  const cartStates = {
    navigate, setNavivate,
    loading, setLoading,
    productsData, setProductsData,
    clientData, setClientData,
  };
  
  return (
    <>
      {
        navigate === 'products' && (
          <SearchProductsAddCart
          cartStates={cartStates}
          />
        )
      }
    </>
  )
};

export default CreateCart;