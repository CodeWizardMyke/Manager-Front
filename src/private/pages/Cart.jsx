import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Cart() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Funcionários",
          text:"Cadastro",
          current: 'employee',
          next: ''
        },
        {
          text:"Gerenciar",
          current: 'employee',
          next: ''
        },
      ])
  },[updateMenuOptions])
  
  return (
    <div>Cart</div>
  )
}

export default Cart