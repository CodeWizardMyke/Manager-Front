import { SiNginxproxymanager } from "react-icons/si";
import { IoExitSharp } from "react-icons/io5";
import { FaUserLock } from "react-icons/fa6";

import './BottomBar.css'

function BottomBar() {
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
        <button className="btm btm-adm">
          <FaUserLock/>
          Administrador
        </button>
        <button className="btm btm-home">
          <FaUserLock/>
          Home
        </button>
        <button className="btm btm-dashboard">
          <FaUserLock/>
          Dashboard
        </button>
        <button className="btm btm-config">
          <FaUserLock/>
          Configurações
        </button>
      </div>
      <div className="bb-rigth">
        <button className="btm btm-logout" type="button">
          <IoExitSharp/>
          Logout
        </button>
      </div>
    </div>
  )
}

export default BottomBar