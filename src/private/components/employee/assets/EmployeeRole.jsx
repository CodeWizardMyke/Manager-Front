import React, { useEffect, useState } from 'react'

function EmployeeRole({role, setRole}) {
  const options = role ? role : [{value:'adiministrador',txt:'adiministrador'},{value:'assistente',txt:'assistente'}]
  const [roleSelect, setRoleSelect ] = useState('admin')

  useEffect(()=> {
    setRole(roleSelect)
  }, [roleSelect,setRole])

  return (
    <div className="util-box">
      <div className="util-func">
          <span>Cargo - Funcionários</span>
        <label htmlFor="role">Selecione um cargo</label>
        <select name="role" id="role" onChange={ e => setRoleSelect(e.target.value)}>
          {options.map((item,index) => ( 
            <option key={'opt_role'+index} value={item.value}>{item.txt}</option>
          ))}
        </select>
      </div>
      <div className="util-func">
        <label htmlFor="rolSel">Cargo Selecionado</label> 
        <input type="text" className='txt-center' readOnly value={roleSelect}/>
      </div>
    </div>
  )
}

export default EmployeeRole