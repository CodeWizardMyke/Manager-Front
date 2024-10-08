import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';
import ManagerCart from '../components/cart/ManagerCart';
import CreateCart from '../components/cart/CreateCart';
import CartProvider from '../context/CartProvider';

function Cart() {
  const {updateMenuOptions, moduleClick } = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Carrinho",
          text:"Cadastro",
          current: 'cart',
          next: 'register'
        },
        {
          text:"Gerenciar",
          current: 'cart',
          next: 'manager'
        },
      ])
  },[updateMenuOptions])
  
  return (
    <CartProvider>
      {moduleClick.next === 'register' && <CreateCart/>}
      {moduleClick.next === 'manager' && <ManagerCart/>}
    </CartProvider>
  )
}

export default Cart;