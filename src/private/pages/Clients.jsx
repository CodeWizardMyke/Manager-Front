import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Clients() {
  const {updateMenuOptions, moduleClick} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Cliente",
          text:"Cadastro",
          current: 'clients',
          next: 'create'
        },
        {
          text:"Gerenciar",
          current: 'clients',
          next: 'manager'
        },
      ])
  },[updateMenuOptions])
  
  return (
    <div>Cart</div>
  )
}

export default Clients;
