import React, { useMemo } from 'react'
import './TableLayout.css'

function getData(element, item ){
  let value = element[item.value];

  if(typeof value === "number") return value;

  if(typeof value === "string") return value.slice(0, 45);

  if(value && typeof value === "object"){
    const stringValues = Object.values(value).find( v => typeof v === "string");
    if(stringValues) return stringValues.slice(0, 45)
  }
  return "-"
}

function TableLayout({data, settings, clickItem}) {
  
  const processedData = useMemo(() => {
    return data.map(row => 
      settings.map(col => getData(row, col))
    );
  }, [data, settings]);

  return (
    <div className="contentTable">
      <table className='tableSearch'>
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
              key={`${row}${rowIndex}`}
              onClick={() => clickItem(data[rowIndex])}
            >
              {row.map((cell, colIndex) => (
                <td key={`${cell}${colIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableLayout