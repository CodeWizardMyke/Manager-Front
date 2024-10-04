import React, { useEffect, useState } from 'react'

function EmployeeBenefit({setBenefit}) {
  const [ gym ,setGym] = useState()
  const [medicalAgreement, setMedicalAgreement] = useState()

  useEffect(()=>{

    const bnf = {
      'academia': gym? gym : 'off',
      'convenio_medico': medicalAgreement ? medicalAgreement : 'off'
    }

    setBenefit(bnf)

  },[gym,medicalAgreement,setBenefit])

  return (
    <div className="util-box">
      <span className='txt-end'>Benefícios</span>

      <div className='cb_util'>
        <input type="checkbox" name="gym" id="gym" onChange={(e)=> setGym(e.target.value)} />
        <label htmlFor="gym">Acadêmia</label>
      </div>
      <div className='cb_util'>
        <input type="checkbox" name="Agreement" id="Agreement" onChange={e => setMedicalAgreement(e.target.value)} />
        <label htmlFor="Agreement">Convênio Médico</label>
      </div>
    </div>
  )
}

export default EmployeeBenefit