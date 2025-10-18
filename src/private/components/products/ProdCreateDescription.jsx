import React from 'react'
import './ProdCreateDescription.css';

function ProdCreateDescription() {
  return (
    <div className='ProdCreateDescription'>
      <div className='txt-area'>
        <label htmlFor="discribe">Descrição do Produto</label>
        <textarea name="discribe" cols={60} id="discribe" placeholder='Descreva mais sobre o produto...' ></textarea>
      </div>
      <div className="bottom-content_pc">
        <div>
          <label htmlFor="official_store_name">Titulo De Vendas</label>
          <input type="text" name='title' id='title'  />
        </div>
        <div>
          <label htmlFor="official_store_name">Titulo O/F Produto</label>
          <input type="text"  name='official_store_name' id='official_store_name' />
        </div>
        <div>
          <label htmlFor="gtin">Código do Produto</label>
          <input type="text" name='gtin' id='gtin' />
        </div>
        <div>
          <label htmlFor="NET_VOLUM">Volume do Produto</label>
          <input type="text" name='NET_VOLUM' id='NET_VOLUM' />
        </div>
        <div>
          <label htmlFor="NET_WEIGHT">Peso do Produto</label>
          <input type="text" name='NET_WEIGHT' id='NET_WEIGHT'  />
        </div>
        <div>
          <label htmlFor="additional">Adicional</label>
          <input type="text" name='additional' id='additional'  />
        </div>
        <div>
          <label htmlFor="product_shape">Forma do produto</label>
          <input type="text" name='product_shape' id='product_shape'  />
        </div>
        <div>
          <label htmlFor="isNewArrival">Lançamento</label>
          <select name="isNewArrival" id="isNewArrival" >
            <option value="new">Lançamento</option>
            <option value="commun">Comum</option>
          </select>
        </div>
        <div>
          <label htmlFor="targetGender">Gênero</label>
          <select name="targetGender" id="targetGender" >
            <option value="Any">Unisex</option>
            <option value="F">Feminino</option>
            <option value="M">Masculino</option>
          </select>
        </div>
        <div>
          <label htmlFor="age_group">Faixa etária</label>
          <select name="age_group" id="age_group"  > 
            <option value="any">Todas</option>
            <option value="adult">Adulto</option>
            <option value="childish">Infantil</option>
          </select>
        </div>

        <div>
          <label htmlFor="winner_item_id">Vencimento</label>
          <input type="date" name='winner_item_id' id='winner_item_id' />
        </div>
      </div>
    </div>
  )
}

export default ProdCreateDescription