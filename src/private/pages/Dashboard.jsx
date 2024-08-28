import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Dashboard() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Dashboard",
          text:"produtos",
          current: 'dashboard',
          next: ''
        },
        {
          text:"vendas",
          current: 'dashboard',
          next: ''
        },
        {
          text:"clientes",
          current: 'dashboard',
          next: ''
        },
      ])
  },[updateMenuOptions])
  

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard