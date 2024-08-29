import { useState } from 'react';
import ManagerContext from './ManagerContext';

function Provider({children}) {
  const [ menuOptions, updateMenuOptions] = useState([]);
  const [ moduleClick, setModuleClick ] = useState({title:'',current:'',next:''});

  const value = {
    moduleClick,setModuleClick,
    menuOptions,updateMenuOptions
  }

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  )
}

export default Provider