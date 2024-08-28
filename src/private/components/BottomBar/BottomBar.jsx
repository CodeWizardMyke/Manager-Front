import {useNavigate} from 'react-router-dom'

import './BottomBar.css'

import { SiNginxproxymanager } from "react-icons/si";
import { IoExitSharp } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa6";
import { IoHome } from "react-icons/io5";
import { RiDashboard2Fill } from "react-icons/ri";
import { GoGear } from "react-icons/go";

function BottomBar() {
  const navigate = useNavigate();

  function goToHome(){
    navigate('/main.manager');
  }

  function goToAdmin(){
    navigate('/main.manager/admin');
  }

  function goToDashboard(){
    navigate('/main.manager/dashboard');
  }

  function goToConfig(){
    navigate('/main.manager/config');
  }

  function logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('employee');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('employee');

    navigate('/auth.manager');
  }

  return (
    <div className='BottomBar'>
      <div className="bb-left">
        <div className="bb-left_top">
          <SiNginxproxymanager/>
          <h4>Manager.</h4>
        </div>
        <div className="bb-left_bottom">
          <span>série: 001</span>
          <span>versão: 001</span>
        </div>
      </div>
      <div className="bb-center">
        <button 
          type="button"
          className="btm btm-adm"
          onClick={goToAdmin}
        >
          <FaUserLock/>
          Administrador
        </button>
        <button 
          type="button"
          className="btm btm-home"
          onClick={goToHome}
        >
          <IoHome/>
          Home
        </button>
        <button 
          className="btm btm-dashboard"
          type="button"
          onClick={goToDashboard}
        >
          <RiDashboard2Fill/>
          Dashboard
        </button>
        <button 
          className="btm btm-config"
          type="button"
          onClick={goToConfig}
        >
          <GoGear/>
          Configurações
        </button>
      </div>
      <div className="bb-rigth">
        <button 
          className="btm btm-logout"
          type="button"
          onClick={logout}
        >
          <IoExitSharp/>
          Logout
        </button>
      </div>
    </div>
  )
}

export default BottomBar