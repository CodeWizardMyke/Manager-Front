import React, { useContext, useEffect } from 'react'
import ManagerContext from '../context/ManagerContext';

function Config() {
  const {updateMenuOptions} = useContext(ManagerContext);
  
  useEffect(()=>{
      updateMenuOptions([
        {
          title:"Configurações",
          text:"display",
          current: 'config',
          next: ''
        },
        {
          text:"colors",
          current: 'config',
          next: ''
        },
      ])
  },[updateMenuOptions])
  
  return (
    <div>Config</div>
  )
}

export default Config