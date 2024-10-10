import React, { useState } from 'react'
import Loading from '../loading/Loading'
import EmployeeRole from './assets/EmployeeRole';
import EmployeeSalary from './assets/EmployeeSalary';
import EmployeeBenefit from './assets/EmployeeBenefit';

import './EmployeeData.css'
import fetchAxios from '../../axios/config';

function EmployeeData() {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('admin');
  const [salary, setSalary] = useState('')
  const [benefit,setBenefit] = useState({'academia': 'off', 'convenio_medico': 'off'})

  async  function sendForm (form){
    try {
      form.preventDefault();
      setLoading(true)
      
      console.log(form.target)
      const formData = new FormData(form.target);
      formData.append('role', role);
      formData.append('salary', salary);
      formData.append('benefit', benefit);

      const response = await fetchAxios.post('/employee/crud/create', formData);

      console.log(response);
      window.alert('criado com sucesso !');
      form.target.reset()

      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      window.alert(error);
    }
  }

  return (
    <div className='module-content'>
      {loading && <Loading/>}
      <div className="top-utils"><div className="content-util">
        <h3>Cadastro do Empregado</h3>  
      </div></div>
      <div className="utils-content">
        <EmployeeRole setRole={setRole} />
        <EmployeeSalary setSalary={setSalary} />
        <EmployeeBenefit setBenefit={setBenefit} />
      </div>
      <div className="module-actions">
        <form onSubmit={(e) => sendForm(e) }>
          <div className="doublerow">
            <div className="divLeft">
              <div className="divHeader">
              <div className="form-group">
                <label htmlFor="Login">Login</label>
                <input type="text" name='email' required id='Login' placeholder='login funcionário' autoComplete='off'/>
              </div>
              <div className="form-group">
                <label htmlFor="password" >Senha</label>
                <input type="password"required name='password' id='password' />
              </div>
              <div className="form-group">
                <label htmlFor="password" >Senha</label>
                <input type="password"required name='re_password' id='password' />
              </div>
              </div>
              <div className="divBody">
                <div className="form-group">
                  <label htmlFor="full_name" >Nome Completo</label>
                  <input type="text" name='name'required id='full_name' />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="employee_email" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Telefone</label>
                  <input type="text" name="telephone" id="telephone" />
                </div>
                <div className="form-group">
                  <label htmlFor="yers_old">Idade</label>
                  <input type="date" name="yers_old" id="yesrs_old" />
                </div>
                <div className="form-group">
                  <label htmlFor="rg">RG</label>
                  <input type="text" name="rg" id="rg" />
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input type="cpf" name="cpf" id="cpf" />
                </div>
              </div>
            </div>
            <div className="divRigth">

              <div className="divBody">
                  <div className="form-group">
                    <label htmlFor="road">Endereço</label>
                    <input type="text" name='road' id='road' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input type="cep" name="cep" id="cep" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Bairro</label>
                    <input type="text" name="district" id="district" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input type="text" name="city" id="city" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input type="state" name="state" id="state" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complements">Complemento</label>
                    <input type="text" name="complements" id="complements" />
                </div>    
              </div>
              <div className="divHeader">
                <span>Cadastrar novo funcionário</span>
                <button className='bt bt-primary'>Enviar cadastro</button>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeData