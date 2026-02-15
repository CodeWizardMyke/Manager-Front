import { useState } from 'react';

import '../style/FormCreate.css'

import TopBar from '../components/TopBar/TopBar'
import Loading from '../components/loading/Loading';
import fetchAxios from '../axios/config';

function ClientCreate({data = {}}) {
  const [loading, setLoading] = useState(false);

  async function createNewClient(e) {
    e.preventDefault();
    try {
      setLoading(true);
      console.log('promisse');

      const bodyData = new FormData(e.target);

      await fetchAxios.post('/client/crud/create', bodyData)
    
      setLoading(false);
      window.alert('Cliente cadastrado com sucesso!');
      e.target.reset();

    } catch (error) {
      console.error('Erro ao cadastrar client', error);
      window.alert('Error ao cadastrar o cliente!');
      setLoading(false);
    }
  }

  return (
    <main className="container-fluid">
        { loading && <Loading /> }

        <TopBar text={'Cadastro do cliente'}/>

        <form className='FormCreate'  onSubmit={(e) => createNewClient(e)}>
          <h2>Client: Leandro Miguel de Paula</h2>
        <div className="formContext space-start">
          <span>Rede Sociais</span>
          <div>
            <label htmlFor="clientName">Nome do cliente: </label>
            <input type="text" name='clientName'   id='clientName'/>
          </div>
          <div>
            <label htmlFor="clientInstagram">Instagram: </label>
            <input type="text" name='clientInstagram' required  id='clientInstagram'/>
          </div>
        </div>

          <div className="buttonsWrapper">
            <button type='submit' className='create'>Cadastrar</button>
            {
              data && <>
                <button type='button' className='update' >Atualizar</button>
                <button type='button' className='delete' >Deletar</button>
              </>
            }
          </div>
        </form>

    </main>
  )
}

export default ClientCreate