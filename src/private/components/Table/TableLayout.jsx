import React, { useMemo } from 'react'
import './TableLayout.css'

function getData(element, item ){
  let value = element[item.value];

  if(typeof value === "number") return value;

  if(typeof value === "string"){
    return value.slice(0, item.maxLength);
  }

  if(value && typeof value === "object"){
    const stringValues = Object.values(value).find( v => typeof v === "string");
    if(stringValues) return stringValues.slice(0, 45)
  }
  return "-"
}

function TableLayout({
    data, 
    settings, 
    clickItem,
    page, setPage,
    size, setSize,
    count
  }){
  
  const processedData = useMemo(() => {
    return data.map(row => 
      settings.map(col => getData(row, col))
    );
  }, [data, settings]);

  function previusPage(){
    if(page >1){
      setPage(page - 1);
    }
  }

  function nexPage(){
    const maxPages =   count / size
    if(page < maxPages){
      setPage(page + 1)
    }
  }

  return (
    <div className="contentTable">
      <table>
        <thead>
          <tr>
            {
              settings.map((item,index) => <th key={`tHeadTh_:${index}`} >{item.label}</th> )
            }
          </tr>
        </thead>
        <tbody>
          {processedData.map((row, rowIndex) => (
            <tr 
              key={`row-${rowIndex}`}
              onClick={() => clickItem(data[rowIndex])}
            >
              {row.map((cell, colIndex) => (
                <td key={`cell-${colIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="tablePagination">
        <div className="wrapperBtns">
          <button 
            type="button"
            onClick={previusPage}
          > Voltar </button>
          <button 
            type="button"
            onClick={nexPage}
          > Avançar </button>
        </div>
          <div className="lengthListBtn">
            <select 
              onChange={e => setSize(e.target.value) }
              value={size}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
      </div>
    </div>
  )
}

export default TableLayout
