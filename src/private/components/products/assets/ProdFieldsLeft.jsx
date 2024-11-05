import React from 'react'
import './ProdFieldsLeft.css'

function ProdFieldsLeft() {
  return (
    <div className='prod_left_fields'>
      <div className="content_textArea">
        <label htmlFor="description">Descrição do Produto</label>
        <textarea name="description" cols={40} id="description"></textarea>
      </div>
      <div className="bottom_left_fields">
        <div className="fd-group w50" >
          <label htmlFor="title">Título de Vendas</label>
          <input type="text" name='title' id='title'/>
        </div>
        <div className="fd-group w50" >
          <label htmlFor="official_store_name">Título Oficial do Produto</label>
          <input type="text" name='official_store_name' id='official_store_name'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="gtin">Código do Produto</label>
          <input type="text" name='gtin' id='gtin'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="NET_VOLUM">Volume do Produto</label>
          <input type="text" name='NET_VOLUM' id='NET_VOLUM'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="NET_WEIGHT">Peso do Produto</label>
          <input type="text" name='NET_WEIGHT' id='NET_WEIGHT'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="winner_item_id">Vencimento</label>
          <input type="date" name='winner_item_id' id='winner_item_id'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="item_condittion">Lançamento</label>
          <select name="item_condittion" id="item_condittion">
            <option value="new">Lançamento</option>
            <option value="commun">Comum</option>
          </select>
        </div>
        <div className="fd-group" >
          <label htmlFor="item_condittion">Gênero</label>
          <select name="gender" id="gender">
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
            <option value="Null">nenhum</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProdFieldsLeft