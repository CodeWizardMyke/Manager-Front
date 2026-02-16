import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
  const [toggleMenu, setToggleMenu] = useState('');
  const navigate = useNavigate();

  function handdleToggleMenu ( opt ){    
    if( opt === toggleMenu){ setToggleMenu(''); }
    else{  setToggleMenu(opt); }
  }

  return (
    <div className='mainMenu'>
      <div className="side-menu-bottom">
        <div className="side-menu-label">Modulos</div>
        <ul>
          <li>
            <div className="btn-dropdown">
              <button type='button' onClick={() => handdleToggleMenu('products')} ><span>Produtos</span></button>
            </div>
            <div className={ `dropdown-menu ${toggleMenu === 'products' ? 'show' : ''}` }>
              <ul>
                <li onClick={() => navigate('products')}><button type='button'>Cadastro</button></li>
                <li onClick={() => navigate('products/search')}><button type='button'>Buscar</button></li>
                <li onClick={() => navigate('products/update')}><button type='button'>Atualizar</button></li>
              </ul>
            </div>
          </li>
          <li>
            <div className="btn-dropdown">
              <button type='button' onClick={() => handdleToggleMenu('clients')} ><span>Clientes</span></button>
            </div>
            <div className={ `dropdown-menu ${toggleMenu === 'clients' ? 'show' : ''}` }>
              <ul>
                <li onClick={() => navigate('client/create')}><button type='button'>Cadasto</button></li>
                <li onClick={() => navigate('client/search')}><button type='button'>Buscar</button></li>
                <li onClick={() => navigate('client/cart')}><button type='button'> Compras</button></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
};

export default SideMenu;