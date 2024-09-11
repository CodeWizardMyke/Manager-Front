import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext'

function Employee() {
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
    <div>Employee</div>
  )
}

export default Employee