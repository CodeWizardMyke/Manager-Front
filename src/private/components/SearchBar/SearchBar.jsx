import React, { useEffect, useState } from "react";
import { ImClearFormatting } from "react-icons/im";
import "./SearchBar.css";

function SearchBar({
  query, setQuery,
  searchBy, setSearchBy,
  filterBy, setFilterBy,
  optionSelect,
  data,
  setFilteredData
}) {
  const [dataOriginal, setDataOriginal] = useState([]);
  const [filterValue, setFilterValue] = useState(""); // controla o input de filtro

  // fallback para optionSelect vazio
  const safeOptions = optionSelect || {
    search: [{ value: "default", label: "Default" }],
    filter: [{ value: "default", label: "Default" }],
  };

  // sempre que o data muda (por nova busca, página, etc), atualiza os dados originais e os filtrados
  useEffect(() => {
    if (data && data.length) {
      setDataOriginal(data);
      setFilteredData(data);
    }
  }, [data, setFilteredData]);

  // aplica o filtro localmente
  function filterData(term) {
    const searchTerm = term.toLowerCase().trim();
    setFilterValue(term);

    if (searchTerm === "") {
      setFilteredData(dataOriginal);
      return;
    }

    const filtered = dataOriginal.filter(item => {
      const field = item[filterBy];
      return field && field.toString().toLowerCase().includes(searchTerm);
    });

    setFilteredData(filtered);
  }

  // limpa o filtro e campo de busca
  function clearFilter() {
    setFilteredData(dataOriginal);
    setQuery("");
    setFilterValue("");
  }

  return (
    <div className="SearchBar">
      <div className="FieldsContainer">
        <div>
          <input
            type="text"
            placeholder="Buscar produto..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div>
          <select
            id="search"
            value={searchBy}
            onChange={e => setSearchBy(e.target.value)}
          >
            {safeOptions.search.map(option => (
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
            placeholder="Filtrar resultados..."
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
            {safeOptions.filter.map(option => (
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
