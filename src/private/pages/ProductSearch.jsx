import React, { useCallback, useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import ViewProductLayout from '../components/products/ViewProductLayout';
import TableLayout from '../components/Table/TableLayout';
import optionSelect from '../configs/products/settingsSearchFields.json';
import tableFields from '../configs/products/settingsTableDefault.json';
import TopBar from '../components/TopBar/TopBar';

import searchProduc from '../functions/searchProduct';

function ProductSearch() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('default');
  const [filterBy, setFilterBy] = useState('title');

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [product, setProduct] = useState(null);
  const [toggleView, setToggleView] = useState(false);

  const sendRequest = useCallback(async () => {
    const response = await searchProduc({ searchBy, query, size, page });
    if (response.error) return console.error(response);

    setCount(response.data.count);
    setData(response.data.rows);
  }, [searchBy, query, size, page]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const clickItem = (item) => {
    setProduct(item);
    setToggleView(true);
  };

  return (
    <main className="container-fluid">
      {toggleView ? (
        <ViewProductLayout
          data={product}
          setViewProduct={setToggleView}
          viewProduct={toggleView}
        />
      ) : (
        <div className="ContentSearch">
          <TopBar text={'Buscar produto'} /> 
          <SearchBar
            optionSelect={optionSelect}
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
            data={filteredData} // agora exibe os dados filtrados
            settings={tableFields}
            clickItem={clickItem}
            page={page}
            setPage={setPage}
            size={size}
            setSize={setSize}
            count={count}
          />
        </div>
      )}
    </main>
  );
}

export default ProductSearch