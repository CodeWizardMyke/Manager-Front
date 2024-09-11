import React, { useState } from 'react'
import { BsPersonFillAdd } from "react-icons/bs";
import fetchAxios from '../../../axios/config';

function ToolCreateClient({updateClientList,setLoading}) {
  const [clientInstagram, setClientInstagram] = useState('');
  const [clientName, setCLientName] = useState('');

  function createClient () {
    if(clientInstagram !== '' && clientName !== ''){
      setLoading(true)
      fetchAxios.post('/client/crud/create',{clientInstagram:clientInstagram,clientName:clientName})
      .then(response => {
        
        setLoading(false)
        window.alert('criado com sucesso!')
        updateClientList()
      })
      .catch(error => {
        setLoading(false);
        alert(error)
        console.log(error);
      })
    }else{
      window.alert('Preencha os campos de instagram e nome para proseguir com o cadástro!')
    }
  };

  return (
    <div className="util-box">
      <div className="util-func">
        <span>Cadastro Rápido de cliente</span>
        <label htmlFor="client_ig">Instagram</label>
        <input type="text" id='client_ig' onChange={(e) => setClientInstagram(e.target.value)} />
      </div>
      <div className="util-func">
        <label htmlFor="client_name">Nome</label>
        <input type="text" id='client_name' onChange={(e) => setCLientName(e.target.value)} />
        <button className='bt-add'
          onClick={createClient}
        ><BsPersonFillAdd/></button>
      </div>
    </div>
  )
}

export default ToolCreateClient