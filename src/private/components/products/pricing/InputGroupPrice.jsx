import React from 'react'

function InputGroupPrice({
  textLabel,
  data,
  setData,
  inputName,
  formatedData,
}) {

  function handlerSetData(e) {
    const value = e.target.value;
    if (setData) setData(value);
  }

  return (
    <div className="input-group">
      <label>{textLabel}</label>

      {/* Campo editável */}
      <input
        type="number"
        placeholder="0"
        min="0"
        value={data || ""}
        onChange={handlerSetData}
      />

      {/* Campo apenas informativo (formatado) */}
      <div className="formated-value">
        <span>Valor definido</span>
        <input
          type="text"
          value={formatedData || ""}
          placeholder={inputName === "stock" ? 0 : "R$: 0"}
          readOnly
        />
      </div>

      {/* Campo oculto para envio no form */}
      <input
        type="hidden"
        name={inputName}
        value={data || ""}
        readOnly
      />
    </div>
  );
}

export default InputGroupPrice;
