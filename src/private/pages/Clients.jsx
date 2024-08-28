import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Clients() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Cliente",
          text:"Cadastro",
          current: 'clients',
          next: ''
        },
        {
          text:"Gerenciar",
          current: 'clients',
          next: ''
        },
      ])
  },[updateMenuOptions])
  

  return (
    <div>Clients</div>
  )
}

export default Clients