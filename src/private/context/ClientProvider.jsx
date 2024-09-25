import { createContext, useState } from "react";

const ClientContext = createContext();

function ClientProvider({children}) {
  const [loading, setLoading]= useState(false);
  const [clientSelect, setClientSelect] = useState(null);
  const [navigate, setNavigate] = useState('first');

  const clientValues = {
    loading,setLoading,
    clientSelect,setClientSelect,
    navigate,setNavigate
  }

  return (
    <ClientContext.Provider value={clientValues}>
      {children}
    </ClientContext.Provider>
  )
}

export {ClientContext};

export default ClientProvider;