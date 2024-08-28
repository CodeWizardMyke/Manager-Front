import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import ManagerContext from '../../context/ManagerContext';

import './SideMenu.css';

function SideMenu() {
  const navigate = useNavigate();
  const {menuOptions} = useContext(ManagerContext);

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

  function handdlerNavigateDinamic(option) {
   navigate(`/main.manager/${option.current}/${option.next}`)
  }

  return (
    <div className='SideMenu'>
      <div className="side-menu-top">
        {menuOptions.length > 0  && (
          <>
            <h4>Gerenciamento de {menuOptions[0].title}</h4>
            <div className='wsm-buttons'> 
              {   
                  menuOptions.map((option, index)=> (
                    <button 
                    key={'buttonMenu-'+index}
                    onClick={()=>{handdlerNavigateDinamic(option)}}
                  >{option.text}</button>
                ))
              }
            </div>
          </>
        )}
      </div>
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