import {Outlet} from 'react-router-dom';
import Provider from './context/Provider';

function Manager() {
  return (
    <div className='content'>
      <Provider>
          'manager page'
      </Provider>
    </div>
  )
}

export default Manager