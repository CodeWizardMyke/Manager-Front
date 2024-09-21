import { useState } from 'react';
import ManagerContext from './ManagerContext';

function Provider({children}) {
  const [ menuOptions, updateMenuOptions] = useState([]);
  const [ moduleClick, setModuleClick ] = useState({title:'',current:'',next:''});
  const [ pagination, setPagination ]  = useState({size:15,page:0,count:1})
  
  const value = {
    moduleClick,setModuleClick,
    menuOptions,updateMenuOptions,
    pagination, setPagination,
  }

  return (
    <ManagerContext.Provider value={value}>
      {children}
    </ManagerContext.Provider>
  )
}

export default Provider