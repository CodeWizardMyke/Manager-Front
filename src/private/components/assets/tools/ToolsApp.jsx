import React from 'react'
import SearchData from './SearchData'
import FilterData from './FilterData'
import DownloadData from './DownloadData'

function ToolsApp({setQuerySearch,searchFunction}) {
  return (
    <div>
      <SearchData setQuerySearch={setQuerySearch} searchFunction={searchFunction} />
      <FilterData/>
      <DownloadData/>
    </div>
  )
}

export default ToolsApp