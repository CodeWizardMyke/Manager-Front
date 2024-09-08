// CartProvider.js
import React, { createContext, useState } from 'react';

// Criação do contexto
const CartContext = createContext();

function CartProvider({ children }) {
  const [cartNavigate, setCartNavigate] = useState('');

  const cartValue = {
    cartNavigate,
    setCartNavigate,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {children}
    </CartContext.Provider>
  );
}

export { CartContext }; 
export default CartProvider;
