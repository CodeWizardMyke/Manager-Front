import {Outlet} from 'react-router-dom';
import Provider from './context/Provider';
import BottomBar from './components/BottomBar/BottomBar';
import SideMenu from './components/SideMenu/SideMenu';
import { MdDoubleArrow } from "react-icons/md";

import './style/PrivateComponents.css'
import { useState } from 'react';

function Manager() {

  const [toggleSideMenu,setToggleSideMenu] = useState(true)

  return (
    <div className='container'>
      <Provider>
        <div className='wrapper-app'>
          { toggleSideMenu && <SideMenu/> }
          <div className='wrapper-rigth'>
            <div className={`arrow_content ${toggleSideMenu ? '' :'arrowRotate'}`}
             onClick={() => setToggleSideMenu(!toggleSideMenu) } 
            ><MdDoubleArrow/></div>
            <Outlet/>
          </div>
        </div>
        <BottomBar/>
      </Provider>
    </div>
  )
}

export default Manager