import React, { useState } from 'react'
import ClientCreateUtils from './assets/ClientCreateUtils'
import './assets/ClientCreate.css'
import Loading from '../loading/Loading';
import fetchAxios from '../../axios/config';

function ClientCreate() {
  const [loading, setLoading] = useState(false)
  const [clientName,setClietName] = useState('')
  const [clientInstagram,setClieInstagram] = useState('')


  async function createNewClient(){
    try {
      setLoading(true)
      const form = document.querySelector("#form")
      const formData = new FormData(form);

      if(clientInstagram.length >0 && clientName.length > 0){
        const response  = await fetchAxios.post('/client/crud/create', formData)
        window.alert('criado com sucesso!');
        console.log('response', response.data)
        form.reset();
      }else{
        window.alert('Preencha os dados de nome e instagram do cliente!')
      }

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log('error', error);
      window.alert(error);
    }
  }

  return (
    <div className="module-content">
      { loading && <Loading/> }
      <div className="top-utils">
        <div className="content-util">
          <h3>Cadastro de novos clientes</h3>
        </div>
      </div>
      <div className="utils-content">
        <ClientCreateUtils/>
      </div>
      <div className="module-actions">
        <div className="bx_double">
          <div className="bx_left">
            <h3>Dados Básicos do cliente</h3>
            <div className="wrapper_clientsAcc">
              <form className='formClient' id='form'>
                <div>
                  <label htmlFor="name">Nome</label>
                  <input type="text" name="clientName" id="name" onChange={ e => setClietName(e.target.value)} />
                </div>
                <div>
                  <label htmlFor="insagram">Instagram</label>
                  <input type="text" name="clientInstagram" id="insagram" onChange={ e => setClieInstagram(e.target.value)}/>
                </div>
                <div>
                  <label htmlFor="clientemail">Email / Login</label>
                  <input type="email" name="email" id="clientemail" autoComplete='new-email' />
                </div>
                <div>
                  <label htmlFor="password">Senha</label>
                  <input type="password" name="password" id="password" autoComplete='new-password'/>
                </div>
                <div>
                  <label htmlFor="re_password">Confirma senha</label>
                  <input type="password" name="re_password" id="re_password"/>
                </div>
              </form>
                <div className="wrapper-btn">
                  <h4>Ações do formulário de cliente</h4>
                  <button className='bt bt-cancel'>Desativar Conta</button>
                  <button className='bt bt-accept' onClick={createNewClient}>Cadastrar</button>
                </div>
            </div>
          </div>
          <div className="bx_rigth">
            <h3>Dados Básicos do cliente</h3>
            <div className="wrapper-clientsAcc">
              <form className="formClient">
                <div className="clientData">
                  <div>
                    <label htmlFor="fullname">Nome completo</label>
                    <input type="text" name="fullname" id="fullname" readOnly/>
                  </div>
                  <div>
                    <label htmlFor="telephone">Telefone</label>
                    <input type="text" name="telephone" id="telephone"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="clientcpf">CPF</label>
                    <input type="text" name="cpf" id="clientcpf"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="old">Data nascimento</label>
                    <input type="data" name="old" id="old"  readOnly/>
                  </div>
                </div>
                <div className="clientData mt-5">
                  <div>
                  <div>
                    <label htmlFor="state">Estado</label>
                    <input type="text" name="state" id="state"  readOnly/>
                  </div>
                    <label htmlFor="city">Cidade</label>
                    <input type="text" name="city" id="city"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="district">Bairro</label>
                    <input type="text" name="district" id="district"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="road">Rua</label>
                    <input type="text" name="road" id="cpf"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="number">Numero</label>
                    <input type="text" name="number" id="number"  readOnly/>
                  </div>
                  <div>
                    <label htmlFor="complement">Complemento</label>
                    <input type="text" name="complement" id="complement" readOnly/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientCreate