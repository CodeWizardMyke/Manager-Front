import React, { useCallback, useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import TableLayout from '../components/Table/TableLayout';
import optionSelect from '../configs/clients/settingsClientSearchFields.json';
import tableFields from '../configs/clients/settingsClientSearchTable.json';
import TopBar from '../components/TopBar/TopBar';

import searchClients from '../functions/searchClients';
import ViewClientLayout from '../components/Client/ViewClientLayout';

function ClientSearch() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [query, setQuery] = useState('');
  const [searchBy, setSearchBy] = useState('default');
  const [filterBy, setFilterBy] = useState('clientName');

  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const [itemSelected, setItemSelected] = useState(null);
  const [toggleView, setToggleView] = useState(false);

  const sendRequest = useCallback(async () => {
    const response = await searchClients({ searchBy, query, size, page });
    if (response.error) return console.error(response);

    setCount(response.data.count);
    setData(response.data.rows);
  }, [searchBy, query, size, page]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  const clickItem = (item) => {
    setItemSelected(item);
    setToggleView(true);
  };

  return (
    <main className="container-fluid">
      {toggleView ? (
        <ViewClientLayout
          data={itemSelected}
          sendRequest={sendRequest}
          setToggleView={setToggleView}
        />
      ) : (
        <div className="ContentSearch">
          <TopBar text={'Pesquisa de clientes'} /> 
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

export default ClientSearch