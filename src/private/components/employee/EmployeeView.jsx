import React, { useState } from 'react'
import Loading from '../loading/Loading'
import EmployeeRole from './assets/EmployeeRole';
import EmployeeSalary from './assets/EmployeeSalary';
import EmployeeBenefit from './assets/EmployeeBenefit';

import './EmployeeData.css'
import fetchAxios from '../../axios/config';
let arrError  = [];

function EmployeeView({data,setData}) {
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('admin');
  const [salary, setSalary] = useState('')
  const [benefit,setBenefit] = useState({'academia': 'off', 'convenio_medico': 'off'})


  async  function sendForm (form){
    
    try {
      form.preventDefault();
      setLoading(true)
      const formData = new FormData(form.target);


      formData.append('role', role);
      formData.append('salary', salary);
      formData.append('benefit', benefit);

      const filteredFormData = new FormData();

      formData.forEach((value, key) => {
        if (value.trim() !== '') {
          filteredFormData.append(key, value);
        }
      });

      await fetchAxios.post('/employee/crud/update', filteredFormData);

      window.alert('Atualizado com sucesso !');

      setLoading(false)
    } catch (error) {
      const { response }  = error
      setLoading(false)
      handdlerError(response.data.errors)
      window.alert(error);
    }
  }

  function emptyError(){
    console.log('arrError', arrError)
    if(arrError.length > 0){
      arrError.map(e => {
        return document.querySelector(`.error-${e.path}`).innerHTML = ''
      }) 
      arrError = []
    }
  }

  function handdlerError(error) {
    emptyError()
    console.log(error)
    if(error.length > 0)
      {
      error.map( (e) => {
        arrError.push(e)
        return document.querySelector(`.error-${e.path}`).innerHTML = e.msg
      })
    }
  }

  return (
    <div className='module-content'>
      {loading && <Loading/>}
      <div className="top-utils"><div className="content-util">
        <h3>Atualização do Funcionário</h3>  
      </div>
        <button className='bt bt-close position-ab-lf' onClick={()=> setData(null)} >Voltar</button>
      </div>
      <div className="utils-content">
        <EmployeeRole setRole={setRole} data={data.role} />
        <EmployeeSalary setSalary={setSalary}  data={data.salary} />
        <EmployeeBenefit setBenefit={setBenefit}  data={data.benefit} />
      </div>
      <div className="module-actions">
        <form onSubmit={(e) => sendForm(e) }>
          <div className="doublerow">
            <div className="divLeft">
              <div className="divBody">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" defaultValue={data.email}  autoComplete='off'/>
                  <span className='error-email'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" >Senha</label>
                  <input type="password"required name='password' id='password' />
                  <span className='error-password'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" >Senha</label>
                  <input type="password"required name='re_password' id='password' />
                  <span className='error-re_password'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="full_name" >Nome Completo</label>
                  <input type="text" name='name' id='full_name' defaultValue={data.name} />
                  <span className='error-name'></span>
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Telefone</label>
                  <input type="text" name="telephone" id="telephone" defaultValue={data.telephone} />
                </div>
                <div className="form-group">
                  <label htmlFor="yers_old">Idade</label>
                  <input type="date" name="yers_old" id="yesrs_old"defaultValue={data.yers_old} />
                </div>
                <div className="form-group">
                  <label htmlFor="rg">RG</label>
                  <input type="text" name="rg" id="rg" defaultValue={data.rg}/>
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input type="cpf" name="cpf" id="cpf" defaultValue={data.cpf}/>
                </div>
              </div>
            </div>
            <div className="divRigth">
              <div className="divBody">
                  <div className="form-group">
                    <label htmlFor="road">Endereço</label>
                    <input type="text" name='road' id='road' defaultValue={data.road}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input type="cep" name="cep" id="cep" defaultValue={data.cep} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Bairro</label>
                    <input type="text" name="district" id="district" defaultValue={data.district}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input type="text" name="city" id="city" defaultValue={data.city}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input type="state" name="state" id="state"defaultValue={data.state} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complements">Complemento</label>
                    <input type="text" name="complements" id="complements" defaultValue={data.complements}/>
                </div>    
              </div>
              <div className="divHeader">
                <span>Atualização de funcionário</span>
                <button className='bt bt-primary'>Atualizar</button>
               </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployeeView 