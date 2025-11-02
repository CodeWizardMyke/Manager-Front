import React, { useEffect, useState } from "react";
import { ImClearFormatting } from "react-icons/im";

import "./SearchBar.css";

function SearchBar({
  query, setQuery,
  searchBy, setSearchBy,
  filterBy, setFilterBy,
  optionSelect,
  data, setData
}) {
  const [dataOriginal, setDataOriginal] = useState([]);
  const [filterValue, setFilterValue] = useState(""); // controla o input de filtro

  // salva o backup apenas uma vez
  useEffect(() => {
    if (data && data.length && dataOriginal.length === 0) {
      setDataOriginal(data);
    }

  }, [data, dataOriginal.length]);

  const optionsSearch = optionSelect.search || [
    { value: "default", label: "default" },
  ];
  const optionsFilter = optionSelect.filter || [
    { value: "default", label: "default" },
  ];

  // 🔍 aplica o filtro
  function filterData(term) {
    const searchTerm = term.toLowerCase().trim();
    setFilterValue(term); // atualiza o estado do input

    if (searchTerm === "") {
      setData(dataOriginal);
      return;
    }

    const filtered = dataOriginal.filter(item => {
      const field = item[filterBy];
      return field && field.toLowerCase().includes(searchTerm);
    });

    setData(filtered);
  }

  //  limpa tudo, inclusive o input
  function clearFilter() {
    setData(dataOriginal);
    setQuery("");
    setFilterValue(""); // limpa o input de filtro
  }

  return (
    <div className="SearchBar">
      <div className="FieldsContainer">
        <div>
          <input
            type="text"
            placeholder="Buscar..."
            value={query || ""}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            id="search"
            value={searchBy}
            onChange={e => setSearchBy(e.target.value)}
          >
            {optionsSearch.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="FieldsContainer">
        <div>
          <input
            id="inputFilter"
            type="text"
            placeholder="Filtrar..."
            value={filterValue}
            onChange={e => filterData(e.target.value)}
          />
          <button type="button" onClick={clearFilter}>
            <ImClearFormatting />
          </button>
        </div>

        <div>
          <select
            name="filter"
            id="filter"
            value={filterBy}
            onChange={e => setFilterBy(e.target.value)}
          >
            {optionsFilter.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
