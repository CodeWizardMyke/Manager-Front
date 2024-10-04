import React, { useContext, useState } from 'react'
import Loading from '../loading/Loading'
import ManagerContext from '../../context/ManagerContext'
import EmployeeRole from './assets/EmployeeRole';
import EmployeeSalary from './assets/EmployeeSalary';
import EmployeeBenefit from './assets/EmployeeBenefit';

import './EmployeeData.css'

function EmployeeData() {
  const { loading,setLoading } = useContext(ManagerContext);
  const [role, setRole] = useState('admin');
  const [salary, setSalary] = useState('')
  const [benefit,setBenefit] = useState({'academia': 'off', 'convenio_medico': 'off'})

  async  function sendForm (){
    try {
      setLoading(true)
      
      
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
      window.alert(error);
    }
  }
  console.log('salary', benefit)


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
        <form>
          <div className="doublerow">
            <div className="divLeft">
              <div className="divHeader">
              <div className="form-group">
                <label htmlFor="Login">Login</label>
                <input type="text" name='login' id='Login' placeholder='login funcionário' autoComplete='off'/>
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input type="password" name='password' id='password' />
              </div>
              </div>
              <div className="divBody">
                <div className="form-group">
                  <label htmlFor="full_name">Nome Completo</label>
                  <input type="text" name='full_name' id='full_name' />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
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