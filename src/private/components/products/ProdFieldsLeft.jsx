import React from 'react'
import './ProdFieldsLeft.css'

function ProdFieldsLeft({data}) {
  return (
    <div className='prod_left_fields'>
      <div className="content_textArea">
        <label htmlFor="discribe">Descrição do Produto</label>
        <textarea name="discribe" cols={40} id="discribe" defaultValue={data? data.discribe : ''}></textarea>
      </div>
      <div className="bottom_left_fields">
        <div className="fd-group w50" >
          <input type="text" placeholder='Título de Vendas' name='title' id='title' defaultValue={data? data.title : ''} />
        </div>
        <div className="fd-group w50" >
          <label htmlFor="official_store_name"></label>
          <input type="text" placeholder='Título Oficial do Produto' name='official_store_name' id='official_store_name' defaultValue={data? data.official_store_name : ''}/>
        </div>
        <div className="fd-group" >
          <label htmlFor="gtin">Código do Produto</label>
          <input type="text" name='gtin' id='gtin' defaultValue={data? data.gtin : ''} />
        </div>
        <div className="fd-group" >
          <label htmlFor="NET_VOLUM">Volume do Produto</label>
          <input type="text" name='NET_VOLUM' id='NET_VOLUM' defaultValue={data? data.NET_VOLUM : ''} />
        </div>
        <div className="fd-group" >
          <label htmlFor="NET_WEIGHT">Peso do Produto</label>
          <input type="text" name='NET_WEIGHT' id='NET_WEIGHT' defaultValue={data? data.NET_WEIGHT : ''} />
        </div>
        <div className="fd-group" >
          <label htmlFor="winner_item_id">Vencimento</label>
          <input type="date" name='winner_item_id' id='winner_item_id'  />
        </div>
        <div className="fd-group" >
          <label htmlFor="additional">Adicional</label>
          <input type="text" name='additional' id='additional' defaultValue={data? data.additional : ''} />
        </div>
        <div className="fd-group" >
          <label htmlFor="product_shape">Forma do produto</label>
          <input type="text" name='product_shape' id='product_shape' defaultValue={data? data.product_shape : ''} />
        </div>
        <div className="fd-group" >
          <label htmlFor="isNewArrival">Lançamento</label>
          <select name="isNewArrival" id="isNewArrival" defaultValue={data? data.isNewArrival : ''} >
            <option value="new">Lançamento</option>
            <option value="commun">Comum</option>
          </select>
        </div>
        <div className="fd-group" >
          <label htmlFor="targetGender">Gênero</label>
          <select name="targetGender" id="targetGender" defaultValue={data? data.targetGender : ''} >
            <option value="Any"></option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div className="fd-group" >
          <label htmlFor="age_group">Faixa etária</label>
          <select name="age_group" id="age_group" defaultValue={data? data.age_group : ''} > 
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