import { useState } from 'react';
import ManagerContext from './ManagerContext';

function Provider({children}) {
  const [ menuOptions, updateMenuOptions] = useState([]);

  const value = {
    menuOptions,updateMenuOptions
  }

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  )
}

export default Provider