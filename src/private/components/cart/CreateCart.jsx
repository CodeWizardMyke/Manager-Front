import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider';

import SearchProducts from './register/SearchProducts';
import ShowCart from './register/ShowCart';
import SearchClients from './register/SearchClients';

function CreateCart() {
  const {navigate} = useContext(CartContext);

  return (
    <>
      {navigate === 'products' && <SearchProducts/>}
      {navigate === 'cart' &&  <ShowCart/> }
      {navigate === 'clients' && <SearchClients/>}
    </>
  )
};

export default CreateCart;