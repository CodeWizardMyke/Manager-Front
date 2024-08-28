import {Outlet} from 'react-router-dom';
import Provider from './context/Provider';
import BottomBar from './components/BottomBar/BottomBar';

function Manager() {
  return (
    <div className='container'>
      <Provider>
        <div className='wrapper-app'>
          <div className='menu-left'></div>
          <div className='content-app'>
            <Outlet/>
          </div>
        </div>
        <BottomBar/>
      </Provider>
    </div>
  )
}

export default Manager