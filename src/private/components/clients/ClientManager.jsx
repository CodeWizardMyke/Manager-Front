import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientProvider'
import ClientSearch from './ClientSearch';
import ClientData from './ClientData';

function ClientManager() {
  const {navigate} = useContext(ClientContext);

  return (
    <>
      {navigate === 'first' && <ClientSearch/>}
      {navigate === 'secound'&& <ClientData/>}
    </>
  )
}

export default ClientManager