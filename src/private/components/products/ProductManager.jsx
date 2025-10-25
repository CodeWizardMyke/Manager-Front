import React, { useContext, useState } from 'react'
import fetchAxios from '../../axios/config';
import ViewProductLayout from './ViewProductLayout';

function ProductManager() {
  const [ data, setData] = useState([]);
  const [ query, setQuery ] = useState('');
  const [ product, setProduct ] = useState(true);
  const [toggleView, setToggleView ] = useState(false);
  const sendRequest = async () => {
    try {
      let url = `/product/${query? 'search/title': 'crud/read'}`;

      const response = await fetchAxios.get(url, { headers: { query : query } });
      console.log(response.data.rows);
      setData(response.data.rows);

    } catch (error) {
      console.log(error);
    }
  }; 

  function handdlerClickProd(data){
    setProduct(data)
    setToggleView(true)
  }

  return (
    <main className='container-fluid'>
      { !toggleView && (
        <>
              <div className="top-utils">
        <label htmlFor="search">Buscar produto</label>
        <input type="text" placeholder='buscar..' onChange={(e) => setQuery(e.target.value)} />
        <button
          type='button'
          onClick={sendRequest}
        >Buscar</button>
      </div>
      <div className="module-actions">
          <div className="content-table">
            <table>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Título</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Estoque</th>
                    <th>Mostrar + </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.length > 0 && (
                      data.map((item,index) => (
                        <tr key={`prodsc_${index+Math.random()}`}>
                          <td>{item.product_id}</td>
                          <td>{item.title}</td>
                          <td>{item.category}</td>
                          <td>{item.price}</td>
                          <td>{item.stock}</td>
                          <td>
                            <button
                              type='button'
                              onClick={() => handdlerClickProd(item) }
                            >Abrir produto</button>
                          </td>
                      </tr>
                      ))
                    )
                  }
                </tbody>
            </table>  
          </div>
      </div>
        </>
      )}
      {
        toggleView && <ViewProductLayout data={product} setViewProduct={setToggleView} viewProduct={toggleView} />
      }
    </main>
  )
}

export default ProductManager