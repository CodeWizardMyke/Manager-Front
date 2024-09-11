import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Admin() {

  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Administração",
          text:"páginas",
          current: 'config',
          next: ''
        }
      ])
  },[updateMenuOptions])
  

  return (
    <div>Admin</div>
  )
}

export default Admin