import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext'
import EmployeeData from '../components/employee/EmployeeData';
import EmployeeSearch from '../components/employee/EmployeeSearch';

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
    <>
      {moduleClick.next === 'create' && <EmployeeData/>}
      {moduleClick.next === 'manager' && <EmployeeSearch/>}
    </>
  )
}

export default Employee