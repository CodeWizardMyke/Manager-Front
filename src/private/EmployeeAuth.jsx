import { useNavigate } from 'react-router-dom'
import fetchAxios from './axios/config';
import { SiNginxproxymanager } from "react-icons/si";
import { useState } from 'react';

import "./style/AppPrivate.css"

function AppPrivate() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  let keeplogin = 'off';
  
  async function handdlerSubmit (event) {
    try {
      event.preventDefault();
      updateErrorsSpan();
      
      const formData = new FormData(event.target);

      const response = await fetchAxios.post('/auth/login', formData);
      if(keeplogin === 'on'){
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('employee');
        localStorage.setItem('employee',  JSON.stringify(response.data.user));
        localStorage.setItem('token', JSON.stringify(response.data.token));
      }else{
        localStorage.removeItem('employee');
        localStorage.removeItem('token');
        sessionStorage.setItem('employee',  JSON.stringify(response.data.user));
        sessionStorage.setItem('token', JSON.stringify(response.data.token));
      }

     // navigate('/main.manager')
    } catch (error) {
      const {response} = error
      console.log(console.log(error))
      if(response){
        handdlerErrors(response.data);
      };
    };
  };

  function handdlerErrors(data){
    console.log('data.errors')
    console.log(data.errors)
    setErrors(data.errors)
    data.errors.map( (e) => document.querySelector(`.errors-${e.path}`).innerHTML = e.msg )
  }

  function updateErrorsSpan(){
    if(errors.length > 0){
     errors.map( (e) =>  document.querySelector(`.errors-${e.path}`).innerHTML = '' );
    }
    setErrors([]);
   };

  return (
    <div className="container">
      <header className="auth-header">
        <SiNginxproxymanager/>
        <h4>Manager io</h4>
      </header>
      <section className="auth-section">

        <div className="wrapper-auth">
          <div className="bx-left"></div>
          <div className="bx-rigth">
            <div className="logo-page">
              <SiNginxproxymanager/>
              <h4>LOGIN</h4>
            </div>
            <form onSubmit={(e) => handdlerSubmit(e) }>
              <div className="auth-inputs-group">
                <div>
                  <label htmlFor="email">Login</label>
                  <input type="email" name="email" id="email"/>
                </div>
                <span className="error errors-email"></span>
              </div>
              <div className="auth-inputs-group">
                <div>
                  <label htmlFor="password">Senha</label>
                  <input type="password" name="password" id="password"/>
                </div>
                <span className="error errors-password"></span>
              </div>
              <div className="keeplogin">
                <label htmlFor="keeplogin">Manter logado</label>
                <input type="checkbox" name="keeplogin" id="keeplogin" onChange={(e) => keeplogin = (e.target.value)}/>
              </div>
              <div className="wrapper-button">
                <button type="submit" className="bt bt-orange">Entrar</button>
              </div>
            </form>
          </div>
        </div>

      </section>
    </div>
  );
}

export default AppPrivate;
