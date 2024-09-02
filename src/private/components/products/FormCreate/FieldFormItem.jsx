import React from 'react'

function FieldFormItem({inputConfig, cssConfig, prodItemData}) {
  const {type, name, txtValue} = inputConfig;
  const { styleDiv, error} = cssConfig;

  const placeholderValue = prodItemData && prodItemData[name] ? prodItemData[name] :"";

  return (
    <div className={ styleDiv ? styleDiv : ''}>
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