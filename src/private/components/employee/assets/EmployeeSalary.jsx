import React, { useEffect, useState } from 'react'

function EmployeeSalary({role_salary, setSalary, data}) {
  let salaryByRole = role_salary ? role_salary : 'Não definido!'
  const [salarySelect, setSalarySelect] = useState('');

  useEffect(()=>{
    if(data){
      setSalary(data)
    }else{
      setSalary(salarySelect)
    }
  },[salarySelect,setSalary,data])


  return (
    <div className="util-box">
    <div className="util-func">
      <span>Sálario - Funcionário</span>
      <label htmlFor="role">Média salárial do cargo</label>
      <input type="text" className='txt-center' readOnly  value={salaryByRole}/>
    </div>
    <div className="util-func">
      <label htmlFor="rolSel">Salário atual definido</label> 
      <input type="text" name='salary' className='txt-center' onChange={ e => setSalarySelect(e.target.value)} />
    </div>
  </div>
  )
}

export default EmployeeSalary