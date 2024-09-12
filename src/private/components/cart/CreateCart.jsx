import { useContext, useEffect } from 'react';
import { CartContext } from '../../context/CartProvider';

import SearchProducts from './register/SearchProducts';
import ShowCart from './register/ShowCart';
import SearchClients from './register/SearchClients';
import AcceptCart from './register/AcceptCart';

function CreateCart() {
  const {navigate, setNavigate, clientData } = useContext(CartContext);

  useEffect(()=>{
    if(clientData){
      setNavigate("")
    }
  },[clientData, setNavigate])
  
  return (
    <>
      {navigate === 'products' && <SearchProducts/>}
      {navigate === 'cart' &&  <ShowCart/> }
      {navigate === 'clients' && <SearchClients/>}
      {clientData && <AcceptCart/>}
    </>
  )
};

export default CreateCart;