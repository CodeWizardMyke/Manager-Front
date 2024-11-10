import React from 'react'
import './ProdFieldsLeft.css'

function ProdFieldsLeft() {
  return (
    <div className='prod_left_fields'>
      <div className="content_textArea">
        <label htmlFor="discribe">Descrição do Produto</label>
        <textarea name="discribe" cols={40} id="discribe"></textarea>
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
          <label htmlFor="additional">Adicional</label>
          <input type="text" name='additional' id='additional'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="product_shape">Forma do produto</label>
          <input type="text" name='product_shape' id='product_shape'/>
        </div>
        <div className="fd-group" >
          <label htmlFor="isNewArrival">Lançamento</label>
          <select name="isNewArrival" id="isNewArrival">
            <option value="new">Lançamento</option>
            <option value="commun">Comum</option>
          </select>
        </div>
        <div className="fd-group" >
          <label htmlFor="targetGender">Gênero</label>
          <select name="targetGender" id="targetGender">
            <option value="Any"></option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="fd-group" >
          <label htmlFor="age_group">Faixa etária</label>
          <select name="age_group" id="age_group">
            <option value="any">Todas</option>
            <option value="adult">Adulto</option>
            <option value="childish">Infantil</option>
          </select>
        </div>
        
      </div>
    </div>
  )
}

export default ProdFieldsLeft