import React, { useContext } from 'react'
import { CartContext } from '../../context/CartProvider'

import SearchClient from './Manager/SearchClient';
import SelectCart from './Manager/SelectCart';
import ShowCart from './Manager/ShowCart';

function ManagerCart() {
  const {navigate} = useContext(CartContext);

  return (
    <div>
      {navigate === 'first' && <SearchClient/>}
      {navigate === 'secound' && <SelectCart/>}
      {navigate === 'third' && <ShowCart/>}
    </div>
  )
}

export default ManagerCart