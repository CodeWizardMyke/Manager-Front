// CartProvider.js
import React, { createContext, useState } from 'react';

// Criação do contexto
const CartContext = createContext();

function CartProvider({ children }) {
  const [pagination, setPagination]  = useState({size:15,page:0,count:1})
  const [loading, setLoading] = useState(false);
  const [navigate, setNavigate] = useState('products');
  const [productsData, setProductsData] = useState([]);
  const [clientData, setClientData] = useState(null);

  const cartValue = {
    pagination, setPagination,
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
