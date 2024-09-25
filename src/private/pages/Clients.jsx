import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';
import ClientCreate from '../components/clients/ClientCreate';
import ClientsManager from '../components/clients/ClientManager';
import ClientProvider from '../context/ClientProvider';

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
    <ClientProvider>
      {moduleClick.next === 'create' && <ClientCreate/> }
      {moduleClick.next === 'manager' && <ClientsManager/>}
    </ClientProvider>
  )
}

export default Clients