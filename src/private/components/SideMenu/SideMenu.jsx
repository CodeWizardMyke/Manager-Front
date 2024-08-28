import React from 'react';
import {useNavigate} from 'react-router-dom';
import './SideMenu.css';

function SideMenu() {
  const navigate = useNavigate();

  function goToProducts(){
    navigate('/main.manager/products');
  };
  function goToCart(){
    navigate('/main.manager/cart');
  };
  function goToClients(){
    navigate('/main.manager/clients');
  };
  function goToEmployee(){
    navigate('/main.manager/employee');
  };

  return (
    <div className='SideMenu'>
      <div className="side-menu-top"></div>
      <div className="side-menu-bottom">
        <h4>Módulos</h4>
        <div className="wsm-buttons">
          <button 
            type="button"
            onClick={goToProducts}
          >Produtos</button>
          <button 
            type="button"
            onClick={goToCart}            
          >Carinho</button>
          <button 
            type="button"
            onClick={goToClients}
          >Clientes</button>
          <button 
            type="button"
            onClick={goToEmployee}
          >Funcionários</button>
        </div>
      </div>
    </div>
  )
};

export default SideMenu;