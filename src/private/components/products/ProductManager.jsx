import React, {  useCallback, useEffect, useState } from 'react'
import fetchAxios from '../../axios/config';
import ViewProductLayout from './ViewProductLayout';
import TableLayout from '../Table/TableLayout';
import SearchBar from '../SearchBar/SearchBar';

function ProductManager() {
  const [ data, setData] = useState([]);
  const [ query, setQuery ] = useState('');
  const [ searchBy, setSearchBy] = useState("default");
  const [ filterBy, setFilterBy] = useState("title");
  const [ size, setSize] = useState(10);
  const [ page, setPage] = useState(0);
  const [ count, setCount] = useState(0);

  const [ product, setProduct ] = useState(true);
  const [ toggleView, setToggleView ] = useState(false);

  const sendRequest = useCallback(
    async ()  => {
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
        
        const headers = {
          query : query, 
          size:size, 
          page:page
        }
  
        const response = await fetchAxios.get(httpURL, { headers:headers });
        
        setCount(response.data.count)
        setData(response.data.rows);
      } catch (error) {
        console.log(error);
      }
    },
    [size,page,query,searchBy],
  )

  useEffect(() => {
    sendRequest()      
  }, [sendRequest]);
  
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
            query={query} setQuery={setQuery}
            filterBy={filterBy} setFilterBy={setFilterBy}
            searchBy={searchBy} setSearchBy={setSearchBy}
            data={data} setData={setData}
          />
          < TableLayout 
            data={data}
            settings={tableFields} 
            clickItem={clickItem} 
            page={page} setPage={setPage}
            size={size} setSize={setSize}
            count={count}
          />
        </div>
      }
    </main>
  )
}


const optionSelect = {
  search:[
    { value: "default", label: "Todos" },
    { value: "title", label: "TITULO" },
    { value: "product_id", label: "ID" },
  ],
  filter:[
    { value: "title", label: "TITULO" },
  ]
}
  

const tableFields = [
  { value: "product_id", label: "ID" },
  { value: "title", label: "TITULO", maxLength: 45 },
  { value: "categoryProduct", label: "CATEGORIA" },
  { value: "brandProduct", label: "MARCA" },
];


export default ProductManager