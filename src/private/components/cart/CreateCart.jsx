import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';

import SearchProducts from './register/SearchProducts';
import ShowCart from './register/ShowCart';
import SearchClients from './register/SearchClients';
import AcceptCart from './register/AcceptCart';

function CreateCart() {
  const {navigate, clientData } = useContext(CartContext);

  return (
    <>
      {navigate === 'first' && <SearchProducts/>}
      {navigate === 'secound' &&  <ShowCart/> }
      {navigate === 'third' && <SearchClients/>}
      {clientData && <AcceptCart/>}
    </>
  )
};

export default CreateCart;