import React from 'react';

const Informations = () => {
  return (

          <div className="FormContent disable-function">

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
              <div className='max-width-div-400'>
                <label htmlFor="mother">Mãe: </label>
                <input type="text" name='mother' value={'Elisa Rayssa Allana'} id='mother'/>
              </div>
              <div className='max-width-div-400'>
                <label htmlFor="pather">Pai: </label>
                <input type="text" name='pather' value={'Thomas Julio de Paula'} id='pather'/>
              </div>
            </div>

            <div className="formContext space-start">
              <span>Online</span>
              <div className='max-width-div-400'>
                <label htmlFor="email">Email: </label>
                <input type="email" name='email' value={'leandro.miguel.depaula@saae.sp.gov.br'} id='email'/>
              </div>
              <div>
                <label htmlFor="password">Pai: </label>
                <input type="password" name='password' value={'Thomas Julio de Paula'} id='password'/>
              </div>
            </div>

            <div className="formContext">
              <span>Endereço</span>
              <div >
                <label htmlFor="cep">CEP: </label>
                <input type="text" name='cep' value={'45604-362'} id='cep'/>
              </div>
              <div className='max-width-div-400'>
                <label htmlFor="rua">Rua: </label>
                <input type="text" name='rua' value={'ravessa da COELBA'} id='rua'/>
              </div>
              <div className='max-width-div-200'>
                <label htmlFor="number">Número: </label>
                <input type="text" name='number' value={'2012'} id='number'/>
              </div>
              <div className='max-width-div-400'>
                <label htmlFor="district">Bairro: </label>
                <input type="text" name='district' value={'Califórnia'} id='district'/>
              </div>

              <div className='max-width-div-400'>
                <label htmlFor="state">Cidade:</label>
                <select name="state" id="state" value={'RJ'}>
                  <option value="SP">São paulo</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="SC">Santa Catarina</option>
                </select>
              </div>
                <div>
                <label htmlFor="state">Cidade:</label>
                <input type="text" name='city' value={'Rio de Janeiro'} id='state' />
              </div>

            </div>

              <div className="formContext space-start">
              <span>Contato</span>
              <div className='max-width-div-400'>
                <label htmlFor="tell">Telefone: </label>
                <input type="text" name='tell' value={'55 + (73) 3998-9031'} id='tell'/>
              </div>
              <div className='max-width-div-400'>
                <label htmlFor="cell">Celular: </label>
                <input type="text" name='cell' value={'55 + (73) 3998-9031'} id='cell'/>
              </div>
              <div className='max-width-div-400'>
                <label htmlFor="whatsapp">WhatsApp: </label>
                <input type="text" name='whatsapp' value={'55 + (73) 3998-9031'} id='whatsapp'/>
              </div>
            </div>

          </div>
  );
}

export default Informations;
