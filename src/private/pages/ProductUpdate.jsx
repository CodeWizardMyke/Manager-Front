import React, { useCallback, useEffect, useState } from 'react'

import searchProduc from '../functions/searchProduct.js';
import settingsSearchFields from '../configs/products/settingsSearchFields.json';
import settingsTableDefault from '../configs/products/settingsTableDefault.json';

import TableLayout from '../components/Table/TableLayout.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import TopBar from '../components/TopBar/TopBar.jsx';
import ProductSetData from './ProductSetData.jsx';

function ProductUpdate() {
  const [data,setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // criado um array extra para os dados filtrados

  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('default');
  const [filterBy, setFilterBy] = useState('title');
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [dataItem,setDataItem] = useState(null);

  const sendRequest = useCallback(async () => {
    const response = await searchProduc({ searchBy, query, size, page });
    if (response.error) return console.error(response);

    setCount(response.data.count);
    setData(response.data.rows);
  }, [searchBy, query, size, page]);

  useEffect(()=> {
    sendRequest();
  },[sendRequest])

  function clickedItem(item){
    setDataItem(item);
  }

  return (
    <main className="container-fluid">
      {
        dataItem && <ProductSetData DataContent={dataItem} setDataContent={setDataItem}/>
      }
      {
        <div className={`ContentSearch ${dataItem ? "hidden" : ""}`}>
          <TopBar text={'Atualizar produto'} /> 
          <SearchBar  // search bar vai ser responsavel por tratar tanto data quando filtredData 
            optionSelect={settingsSearchFields}
            query={query}
            setQuery={setQuery}
            searchBy={searchBy}
            setSearchBy={setSearchBy}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            data={data}
            setFilteredData={setFilteredData}
          />
          <TableLayout
            data={filteredData} //invés de tratar os dados diretos aplico o que foi filtrado na tabela
            settings={settingsTableDefault}
            clickItem={clickedItem}
            page={page} setPage={setPage}
            size={size} setSize={setSize}
            count={count}
          />
        </div>
      }
    </main>
  )
}

export default ProductUpdate