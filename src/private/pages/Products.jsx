import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';
import ProductCreate from '../components/products/ProductCreate';
import ProductManager from '../components/products/ProductManager';
import ProductCreateProvider from '../context/ProductCreateProvider';

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
    <ProductCreateProvider>
      {moduleClick.next === 'create' && (<ProductCreate/>)}
      {moduleClick.next === 'manager' && <ProductManager/>}
    </ProductCreateProvider>
  )
}

export default Products