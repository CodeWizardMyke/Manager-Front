// CartProvider.js
import React, { createContext, useState } from 'react';

// Criação do contexto
const CartContext = createContext();

function CartProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState('products');
  const [productsData, setProductsData] = useState([]);
  const [clientData, setClientData] = useState(null);

  const cartValue = {
    loading, setLoading,
    navigate, setNavigate,
    productsData, setProductsData,
    clientData, setClientData
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext }; 
export default CartProvider;
