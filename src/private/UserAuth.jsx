import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import "./EmployeeAuth.css"
import fetchAxios from './axios/config';
import Loading from './components/loading/Loading';

function UserAuth() {
  const [keepLogIn, setKeepLogIn] = useState('off');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function cleanStorage(){
    localStorage.removeItem('employee');
    localStorage.removeItem('token');
    sessionStorage.removeItem('employee');
    sessionStorage.removeItem('token');
  }

  function userAthorized(response) {
    if(keepLogIn === 'on'){
      cleanStorage();
      localStorage.setItem('employee',  JSON.stringify(response.data.user));
      localStorage.setItem('token', JSON.stringify(response.data.token));
    }else{
      cleanStorage();
      sessionStorage.setItem('employee',  JSON.stringify(response.data.user));
      sessionStorage.setItem('token', JSON.stringify(response.data.token));
    }
    navigate('/main');
  }

  async function handdlerSubmit (event) {
    try {
      event.preventDefault();
      setLoading(true);
      updateErrorsSpan();
      
      const formData = new FormData(event.target);
      const response = await fetchAxios.post('/auth/login', formData);
      userAthorized(response);
      console.log('response', response)

    } catch (error) {
      setLoading(false);
      console.log(error);
      if(error.response){
        handdlerErrors(error.response.data);
      };
    };
  }

  function handdlerErrors(data){
    console.log('data.errors', data.errors)
    data.errors.map( (e) => {
      const span = document.createElement('span');
      span.innerHTML = e.msg;
     return document.querySelector(`.content-errros`).appendChild(span);
    })
  }

  function updateErrorsSpan(){
    document.querySelector(`.content-errros`).innerHTML = '';
  };

  return (
    <main className="container container-auth">
      <section className='section-auth'>
        { loading && <Loading/>}
        <div className="content-auth">
          <div className="label-auth"><span>Login de usuarios</span></div>
          <form onSubmit={(e) => handdlerSubmit(e) }>

            <div>
              <label htmlFor="email">Login</label>
              <input type="email" name="email" id="email" required/>
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" required/>
            </div>

            <article className='keep-login'>
              <label htmlFor="keeplogin">manter credenciais</label>
              <input type="checkbox" name="keeplogin" id="keeplogin" onChange={(e) => setKeepLogIn(e.target.value)}/>
            </article>
              <div className="content-errros"></div>
            <article className="submit-auth">
                <button type="submit">Entrar</button>
            </article>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UserAuth;
