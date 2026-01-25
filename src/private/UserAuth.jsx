import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

import "./EmployeeAuth.css"
import fetchAxios from './axios/config';
import Loading from './components/loading/Loading';

function UserAuth() {
  const [keepLogIn, setKeepLogIn] = useState('off');
  const [loading, setLoading] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);
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

  async function createNewUser(formData){
    return await fetchAxios.post('/employee/crud/create', formData);
  }

  async function loginUser(formData){
    return await fetchAxios.post('/auth/login', formData);
  }

  async function handdlerSubmit (event) {
    try {
      event.preventDefault();
      setLoading(true);
      updateErrorsSpan();
      const formData = new FormData(event.target);

      let response = null;

      if(createAcc === true){
        await createNewUser(formData);
        window.alert('Usuário cadastrado com sucesso, faça o login para validar sua sessão.')
      }
      if(createAcc === false){
        response = await loginUser(formData)
      }
      if(response !== null){
        userAthorized(response);
      }
      console.log('response', response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      if(error.response){
        handdlerErrors(error.response.data);
      };
    }      
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
            {
              createAcc && (
                <>
                  <div>
                    <label htmlFor="userName">Nome</label>
                    <input type="text" name="name" id="userName" required/>
                  </div>

                  <div>
                    <label htmlFor="role">Cargo</label>
                    <select name="role" id="role">
                      <option value="aux">Auxiliar</option>
                      <option value="adimin">Administrador</option>
                    </select>
                  </div>
                </>
              )
            }
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" required/>
            </div>
           
            <div>
              <label htmlFor="password">Senha</label>
              <input type="password" name="password" id="password" required/>
            </div>
            {
              createAcc && (
                <div>
                  <label htmlFor="re_password">Senha</label>
                  <input type="password" name="re_password" id="re_password" required/>
                </div>
              )
            }

            <article className='suggestions'>
              <div>
                <label htmlFor="keeplogin">manter credenciais</label>
                <input type="checkbox" name="keeplogin" id="keeplogin" onChange={(e) => setKeepLogIn(e.target.value)}/>
              </div>
              <div>
                <input type="button" value={ !createAcc ? "Fazer novo cadastro" : "Conta existente fazer login"} className='singup' onClick={()=> setCreateAcc(!createAcc)} />
              </div>
            </article>

            <div className="content-errros"></div>
            <article className="submit-auth">
                <button type="submit">{ createAcc ? "Enviar cadastro" : "Entrar" }</button>
            </article>
          </form>
        </div>
      </section>
    </main>
  );
}

export default UserAuth;
