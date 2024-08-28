import React, { useEffect, useState } from 'react'
import ManagerContext from './ManagerContext'

function Provider({childern}) {
  const [employee,setEmployee] = useState(null);

  useEffect(()=>{
    const userLocal = JSON.parse(localStorage.getItem('employee'));
    const userSection = JSON.parse(sessionStorage.getItem('employee'));

    const user = userLocal ? userLocal : userSection;
    setEmployee(user);

  },[employee])

  const value ={
    employee:employee,
  };

  return (
    <ManagerContext.Provider value={value}>
      {childern}
    </ManagerContext.Provider>
  )
}

export default Provider