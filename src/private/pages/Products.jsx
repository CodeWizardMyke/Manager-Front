import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Products() {
  const { updateMenuOptions, moduleClick } = useContext(ManagerContext);

  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Produtos",
          text:"Cadastro",
          current: 'products',
          next: 'create',
        },
        {
          text:"Gerenciar",
          current: 'products',
          next: 'manager',
        },
      ])


  },[updateMenuOptions])

  return (
    <div>Cart</div>
  )
}

export default Products