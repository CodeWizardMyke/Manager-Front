import React, {  useState } from 'react'
import fetchAxios from '../../axios/config';
import ViewProductLayout from './ViewProductLayout';
import TableLayout from '../Table/TableLayout';
import SearchBar from '../SearchBar/SearchBar';

function ProductManager() {
  const [ data, setData] = useState([]);
  const [ query, setQuery ] = useState('');
  const [ searchBy, setSearchBy] = useState("default");
  const [ filterBy, setFilterBy] = useState("");

  const [ product, setProduct ] = useState(true);
  const [toggleView, setToggleView ] = useState(false);

  const optionSelect = [
    { value: "default", label: "Todos" },
    { value: "title", label: "TITULO" },
    { value: "id", label: "ID" },
    { value: "gtin", label: "CODIGO" },
  ];
  
  const tableFields = [
    { value: "product_id", label: "ID" },
    { value: "title", label: "TITULO" },
    { value: "categoryProduct", label: "CATEGORIA" },
    { value: "brandProduct", label: "MARCA" },
  ];
  
  const sendRequest = async () => {
    try {
      let httpURL = "";

      if(searchBy === "default"){
        httpURL = httpURL+ "/product/crud/read";
      }
      if(searchBy !== "default" && query === ""){
        httpURL = httpURL+ "/product/crud/read";
      }
      if(searchBy !== "default" && query !== ""){
        httpURL = httpURL+ "/product/search/"+ searchBy;
      }

      const response = await fetchAxios.get(httpURL, { headers: { query : query } });
      setData(response.data.rows);

      console.log('response', response.data.rows)
    } catch (error) {
      console.log(error);
    }
  }; 

  function clickItem(data){
    setProduct(data)
    setToggleView(true)
  }

  return (
    <main className='container-fluid'>
      {
        toggleView ? toggleView && <ViewProductLayout data={product} setViewProduct={setToggleView} viewProduct={toggleView} />
        : 
        <div className="ContentSearch">
          < SearchBar 
            optionSelect={optionSelect}
            sendRequest={sendRequest}
            query={query} setQuery={setQuery}
            filterBy={filterBy} setFilterBy={setFilterBy}
            searchBy={searchBy} setSearchBy={setSearchBy}
          />
          < TableLayout data={data} settings={tableFields} clickItem={clickItem} />
        </div>
      }
    </main>
  )
}

export default ProductManager