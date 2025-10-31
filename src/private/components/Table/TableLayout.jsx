import React from 'react'
import './TableLayout.css'
function TableLayout({data, settings, clickItem}) {
  

  function getData(element, item ){
    let snippet = element[item.value];
    let valueReturn = "-"

    if(typeof snippet === "object" && snippet !== null){
      if(Array.isArray(Object.values(snippet))){
        Object.values(snippet).map(e => {
          if(typeof e === "string") valueReturn = e;
          return false;
        })
      }
    }

    if(typeof element[item.value] === "string"){
      valueReturn = element[item.value]
    }

    if(typeof element[item.value] === 'number') return element[item.value]

    return valueReturn.slice(0,45);
  }

  return (
    <div className="contentTable">
      <table className='tableSearch'>
        <thead>
          <tr>
            {
              settings.map((item,index) => <th key={`item_${index}`} >{item.label}</th> )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.map((element,index) => {
              return (
                <tr 
                  key={`bTable_${index}`}
                  onClick={() => clickItem(element)}
                >
                  {
                    settings.map( item => (
                      <td> { getData(element, item) } </td>
                    ))
                  }
                </tr>
              )            
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default TableLayout