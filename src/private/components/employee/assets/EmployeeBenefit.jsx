import React, { useEffect, useState } from 'react'

function EmployeeBenefit({setBenefit, data}) {
  const [ gym ,setGym] = useState()
  const [medicalAgreement, setMedicalAgreement] = useState()

  useEffect(()=>{
    let benefit = {}

    if(data){
      benefit.academia = data.gym;
      benefit.convenio_medico = data.medicalAgreement;
    }
    else{
      benefit.academia = gym ? gym : 'off';
      benefit.convenio_medico = medicalAgreement ? medicalAgreement : 'off';
    }

    setBenefit(benefit)

  },[gym,medicalAgreement,setBenefit,data])

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