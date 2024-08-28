import {Outlet} from 'react-router-dom';
import Provider from './context/Provider';
import BottomBar from './components/BottomBar/BottomBar';
import SideMenu from './components/SideMenu/SideMenu';

function Manager() {
  return (
    <div className='container'>
      <Provider>
        <div className='wrapper-app'>
          <SideMenu/>
          <Outlet/>
        </div>
        <BottomBar/>
      </Provider>
    </div>
  )
}

export default Manager