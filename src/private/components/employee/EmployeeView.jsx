import React, { useState } from 'react'
import Loading from '../loading/Loading'
import EmployeeRole from './assets/EmployeeRole';
import EmployeeSalary from './assets/EmployeeSalary';
import EmployeeBenefit from './assets/EmployeeBenefit';

import './EmployeeData.css'
import fetchAxios from '../../axios/config';

function EmployeeView({data,setData}) {
  let arrError  = [];
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('admin');
  const [salary, setSalary] = useState('')
  const [benefit,setBenefit] = useState({'academia': 'off', 'convenio_medico': 'off'})


  async  function sendForm (form){
    
    try {
      form.preventDefault();
      setLoading(true)
      const formData = new FormData(form.target);
      console.log('data', data)

      formData.append('role', role);
      formData.append('salary', salary);
      formData.append('benefit', benefit);

      const filteredFormData = new FormData();

      formData.forEach((value, key) => {
        if (value.trim() !== '') {
          filteredFormData.append(key, value);
        }
      });

      await fetchAxios.put('/employee/crud/update', filteredFormData, { headers:{employee_id: data.employee_id}});

      window.alert('Atualizado com sucesso !');

      setLoading(false)
    } catch (error) {
      setLoading(false);

      if(error.status === 400 ){
        emptyError()
        console.log('error', error)
        handdlerError(error.response.data.errors)
      }
      console.log('error', error)
      window.alert(error);
    }
  }

  function emptyError(){
    if(arrError.length > 0){
      arrError.map(e => {
        return document.querySelector(`.error-${e.path}`).innerHTML = '';
      });
      arrError = [];
    };
  };

  function handdlerError(error) {
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
                  <input type="email" name="email" id="email" placeholder={data.email}  autoComplete='new-email'/>
                  <span className='error-email'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="password" >Senha</label>
                  <input type="password" name='password' id='password' autoComplete='new-password' />
                  <span className='error-password'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="re_password" >Senha</label>
                  <input type="password" name='re_password' id='re_password' autoComplete='new-password' />
                  <span className='error-re_password'></span>
                </div>
                <div className="form-group">
                  <label htmlFor="full_name" >Nome Completo</label>
                  <input type="text" name='name' id='full_name' placeholder={data.name} autoComplete='new-name' />
                  <span className='error-name'></span>
                </div>

                <div className="form-group">
                  <label htmlFor="telephone">Telefone</label>
                  <input type="text" name="telephone" id="telephone" placeholder={data.telephone} autoComplete='new-telephone' />
                </div>
                <div className="form-group">
                  <label htmlFor="yers_old">Idade</label>
                  <input type="date" name="yers_old" id="yesrs_old"placeholder={data.yers_old} autoComplete='new-yers_old' />
                </div>
                <div className="form-group">
                  <label htmlFor="rg">RG</label>
                  <input type="text" name="rg" id="rg" placeholder={data.rg} autoComplete='new-rg'/>
                </div>
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input type="cpf" name="cpf" id="cpf" placeholder={data.cpf} autoComplete='new-cpf' />
                </div>
              </div>
            </div>
            <div className="divRigth">
              <div className="divBody">
                  <div className="form-group">
                    <label htmlFor="road">Endereço</label>
                    <input type="text" name='road' id='road' placeholder={data.road}  onFocus={(e) => e.target.removeAttribute('readonly')} autoComplete='new-road' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cep">CEP</label>
                    <input type="cep" name="cep" id="cep" placeholder={data.cep} autoComplete='new-cep' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="district">Bairro</label>
                    <input type="text" name="district" id="district" placeholder={data.district} autoComplete='new-district' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">Cidade</label>
                    <input type="text" name="city" id="city" placeholder={data.city} autoComplete='new-city' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">Estado</label>
                    <input type="state" name="state" id="state"placeholder={data.state} autoComplete='new-state' />
                  </div>
                  <div className="form-group">
                    <label htmlFor="complements">Complemento</label>
                    <input type="text" name="complements" id="complements" placeholder={data.complements} autoComplete='new-complements' />
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