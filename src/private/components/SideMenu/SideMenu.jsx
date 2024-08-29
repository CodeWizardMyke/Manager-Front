import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import ManagerContext from '../../context/ManagerContext';

import './SideMenu.css';

function SideMenu() {
  const navigate = useNavigate();
  const {menuOptions, setModuleClick,} = useContext(ManagerContext);
  let activerHandder = {current:'null'};

  if(menuOptions.length){
    activerHandder = menuOptions[0];
  }

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
    setModuleClick(option);
  }

  return (
    <div className='SideMenu'>
      <div className={menuOptions.length ? "side-menu-top smt-active" : "side-menu-top" }>
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
            className={activerHandder.current === 'products' ? "wsm-btn-active" : ""}
            onClick={goToProducts}
          >Produtos</button>
          <button 
            type="button"
            className={activerHandder.current === 'cart' ? "wsm-btn-active" : ""}
            onClick={goToCart}            
          >Carinho</button>
          <button 
            type="button"
            className={activerHandder.current === 'clients' ? "wsm-btn-active" : ""}
            onClick={goToClients}
          >Clientes</button>
          <button 
            type="button"
            className={activerHandder.current === 'employee' ? "wsm-btn-active" : ""}
            onClick={goToEmployee}
          >Funcionários</button>
        </div>
      </div>
    </div>
  )
};

export default SideMenu;