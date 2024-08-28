import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Products() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Produtos",
          text:"Cadastro",
          current: 'products',
          next: ''
        },
        {
          text:"Gerenciar",
          current: 'products',
          next: ''
        },
      ])
  },[updateMenuOptions])
  
  return (
    <div>Products</div>
  )
}

export default Products