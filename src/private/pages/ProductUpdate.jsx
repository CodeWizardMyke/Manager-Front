import React, { useCallback, useEffect, useState } from 'react'

import searchProduc from '../functions/searchProduct.js';
import settingsSearchFields from '../configs/products/settingsSearchFields.json';
import settingsTableDefault from '../configs/products/settingsTableDefault.json';

import TableLayout from '../components/Table/TableLayout.jsx';
import SearchBar from '../components/SearchBar/SearchBar.jsx';
import TopBar from '../components/TopBar/TopBar.jsx';
import ProductSetData from './ProductSetData.jsx';

function ProductUpdate() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('default');
  const [filterBy, setFilterBy] = useState('title');
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [dataItem, setDataItem] = useState(null);
  const [updatedOrder, setUpdatedOrder] = useState(false);

  const sendRequest = useCallback(async () => {
    const response = await searchProduc({ searchBy, query, size, page });
    if (response.error) return console.error(response);

    setCount(response.data.count);
    setData(response.data.rows);
    setFilteredData(response.data.rows); // garante sync inicial
  }, [searchBy, query, size, page]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  useEffect(() => {
    if (updatedOrder && dataItem) {

      // Atualiza o array principal
      const newData = data.map(item =>
        item.product_id === dataItem.product_id ? dataItem : item
      );

      // Atualiza a lista filtrada SEM PERDER filtro atual
      const newFiltered = filteredData.map(item =>
        item.product_id === dataItem.product_id ? dataItem : item
      );

      setData(newData);
      setFilteredData(newFiltered);
      setUpdatedOrder(false);
    }
  }, [updatedOrder, dataItem, data, filteredData]);

  function clickedItem(item) {
    setDataItem(item);
  }

  return (
    <main className="container-fluid">
      {dataItem && (
        <ProductSetData
          DataContent={dataItem}
          setDataContent={setDataItem}
          setUpdatedOrder={setUpdatedOrder}
        />
      )}

      <div className={`ContentSearch ${dataItem ? 'hidden' : ''}`}>
        <TopBar text={'Atualizar produto'} />

        <SearchBar
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
          data={filteredData}
          settings={settingsTableDefault}
          clickItem={clickedItem}
          page={page}
          setPage={setPage}
          size={size}
          setSize={setSize}
          count={count}
        />
      </div>
    </main>
  );
}

export default ProductUpdate;
