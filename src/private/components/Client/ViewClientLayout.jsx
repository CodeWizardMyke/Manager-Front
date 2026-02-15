import React, { useState } from 'react';
import Loading from '../loading/Loading';
import TopBar from '../TopBar/TopBar';
import fetchAxios from '../../axios/config';

const ViewClientLayout = ({data,sendRequest,setToggleView}) => {
  const [loading, setLoading] = useState(false);

 async function updateClient(e){
  e.preventDefault();
  try {
    const formData = new FormData(e.target);

    await fetchAxios.put('/client/crud/update', formData, {headers:{client_id:data.client_id} });

    sendRequest();
    setToggleView(false)

  } catch (error) {
    setLoading(false);
      console.error('Erro ao cadastrar o cliente:', error);
  }
 }

  async function deleteClient(){
    try {

    await fetchAxios.delete('/client/crud/destroy', {headers:{client_id:data.client_id} });
    window.alert('Deletedo com sucesso!');

    sendRequest();
    setToggleView(false)

  } catch (error) {
    setLoading(false);
      console.error('Erro ao deletar o cliente:', error);
  }
 }

  return (
    <main className="container-fluid">
      { loading && <Loading /> }

      <TopBar text={'Vizualização do cliente'}/>
      <form className='FormCreate'  onSubmit={(e) => updateClient(e)}>
        
        <button type="button" className='prevPag' onClick={()=> setToggleView(false)}>Voltar</button>
        <h2>Client: Leandro Miguel de Paula</h2>
        <div className="formContext space-start">
          <span>Rede Sociais</span>
          <div>
            <label htmlFor="clientName">Nome do cliente: </label>
            <input type="text" name='clientName'   id='clientName' defaultValue={`${data.clientName ? data.clientName : ""}`}/>
          </div>
          <div>
            <label htmlFor="clientInstagram">Instagram: </label>
            <input type="text" name='clientInstagram' required  id='clientInstagram'  defaultValue={`${data.clientInstagram ? data.clientInstagram : ""}`}/>
          </div>
        </div>

        <div className="buttonsWrapper">
            <button type='submit' className='update' >Atualizar</button>
            <button type='button' className='delete' onClick={deleteClient} >Deletar</button>
          </div>
        </form>
      </main>
  );
}

export default ViewClientLayout;
