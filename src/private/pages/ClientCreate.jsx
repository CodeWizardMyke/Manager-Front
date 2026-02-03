import { useState } from 'react';

import '../style/FormCreate.css'

import TopBar from '../components/TopBar/TopBar'
import Loading from '../components/loading/Loading';

function ClientCreate() {
  const [loading, setLoading] = useState(false);

  return (
    <main className="container-fluid">
        { loading && <Loading /> }

        <TopBar text={'Cadastro do cliente'}/>

        <form className='FormCreate'>
          <h2>Client: Leandro Miguel de Paula</h2>
          <div className="FormContent">

            <div className="formContext">
              <span>Dados pessoais</span>
              <div>
                <label htmlFor="cpf">CPF: </label>
                <input type="text" name='cpf' value={'624.063.034-97'} id='cpf'/>
              </div>
              <div>
                <label htmlFor="cpf">RG: </label>
                <input type="text" name='RG' value={'29.942.727-4'} id='RG'/>
              </div>
              <div>
                <label htmlFor="sexo">Sexo: </label>
                <select name="sexo" id="sexo">
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="any">Não definido</option>
                </select>
              </div>
              <div>
                <label htmlFor="age">Data de Nascimento:</label>
                <input type="text" name="age" id="age" value={'10-01-1985'}/>
              </div>
            </div>
            <div className="formContext space-start">
              <span>Filiações</span>
              <div>
                <label htmlFor="mother">Mãe: </label>
                <input type="text" name='mother' value={'Elisa Rayssa Allana'} id='mother'/>
              </div>
              <div>
                <label htmlFor="pather">Pai: </label>
                <input type="text" name='pather' value={'Thomas Julio de Paula'} id='pather'/>
              </div>
            </div>
          </div>
        </form>

    </main>
  )
}

export default ClientCreate