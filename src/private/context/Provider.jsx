import ManagerContext from './ManagerContext';

function Provider({children}) {
  return (
    <ManagerContext.Provider value={'value'}>
      {children}
    </ManagerContext.Provider>
  )
}

export default Provider