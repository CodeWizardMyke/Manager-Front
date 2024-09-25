import React, { useContext } from 'react'
import { ClientContext } from '../../context/ClientProvider'
import ClientSearch from './ClientSearch';

function ClientManager() {
  const {navigate} = useContext(ClientContext);

  return (
    <>
      {navigate === 'first' && <ClientSearch/>}
    </>
  )
}

export default ClientManager