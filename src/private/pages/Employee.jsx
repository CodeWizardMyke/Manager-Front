import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext'

function Employee() {
  const {updateMenuOptions, moduleClick} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Funcionários",
          text:"Cadastro",
          current: 'employee',
          next: 'create'
        },
        {
          text:"Gerenciar",
          current: 'employee',
          next: 'manager'
        },
      ])
  },[updateMenuOptions])

  return (
    <div>Cart</div>
  )
}

export default Employee