import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';
import ClientCreate from '../components/clients/ClientCreate';

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
    <>
      {moduleClick.next === 'create' && <ClientCreate/> }
      {moduleClick.next === 'manager' && <>manager client</>}
    </>
  )
}

export default Clients