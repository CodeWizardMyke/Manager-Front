import React from 'react'

function FieldFormItem({inputConfig, cssConfig, oldData}) {
  const {type, name, txtValue} = inputConfig;
  const { formGroup, error} = cssConfig;

  const placeholderValue = oldData && oldData[name] ? oldData[name] :"Valor não preenchido";

  return (
    <div className={ formGroup ? "form-group " + formGroup : 'form-group'}>
      <label htmlFor={name}>{txtValue}</label>
      {
        type === 'select' && (
          <select name={name} id={name}>
            {
              inputConfig.selectOptions.map( (option,index) => (
                <option 
                  key={'SelectOptions'+ index} 
                  value={option.value}
                >{option.txtValue}</option>
              ))
            }
          </select>
        )
      }
      {
        type !== 'select' && (
          <input type={type} name={name} id={name} placeholder={ placeholderValue } />
        )
      }
      <div className={error ? `error errors-${name} ${error}` : `error errors-${name}`}></div>
    </div>
  )
}

export default FieldFormItem;