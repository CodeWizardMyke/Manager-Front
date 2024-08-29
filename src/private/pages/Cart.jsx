import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Cart() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Carrinho",
          text:"Cadastro",
          current: 'cart',
          next: ''
        },
        {
          text:"Gerenciar",
          current: 'cart',
          next: ''
        },
      ])
  },[updateMenuOptions])
  
  return (
    <div>Cart</div>
  )
}

export default Cart