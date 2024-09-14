import React from 'react'
import SearchData from './SearchData'
import FilterData from './FilterData'
import DownloadData from './DownloadData'

function ToolsApp({setQuerySearch,searchFunction, searchConfig}) {
  return (
    <>
      <SearchData setQuerySearch={setQuerySearch} searchFunction={searchFunction} searchConfig={searchConfig} />
      <FilterData/>
      <DownloadData/>
    </>
  )
}

export default ToolsApp