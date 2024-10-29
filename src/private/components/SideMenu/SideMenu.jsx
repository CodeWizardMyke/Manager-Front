import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import ManagerContext from '../../context/ManagerContext';
import { FaProductHunt } from "react-icons/fa";
import { TbShoppingCartStar } from "react-icons/tb";
import { FaPeopleGroup } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";

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
    <div className='mainMenu'>
      <div className="wrapper-main_menu">
        <div className={menuOptions.length ? "smt-active" : "" }>
          {menuOptions.length > 0  && (
            <>
              <h4>{menuOptions[0].title}</h4>
              <div className='wsm-buttons'> 
                {   
                    menuOptions.map((option, index)=> (
                      <button 
                      key={'buttonMenu-'+index}
                      id={'buttonMenu_'+index}
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
            >
              <span>Produtos</span>
              <FaProductHunt/>
            </button>
            <button 
              type="button"
              className={activerHandder.current === 'cart' ? "wsm-btn-active" : ""}
              onClick={goToCart}            
            >
              <span>Carinho</span>
              <TbShoppingCartStar/>
            </button>
            <button 
              type="button"
              className={activerHandder.current === 'clients' ? "wsm-btn-active" : ""}
              onClick={goToClients}
            >
              <span>Clientes</span>
              <FaPeopleGroup/>
            </button>
            <button 
              type="button"
              className={activerHandder.current === 'employee' ? "wsm-btn-active" : ""}
              onClick={goToEmployee}
            >
              <span>Funcionários</span>
              <FiUsers/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SideMenu;