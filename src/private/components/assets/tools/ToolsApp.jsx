import React from 'react'
import SearchData from './SearchData'
import FilterData from './FilterData'
import DownloadData from './DownloadData'

function ToolsApp({setQuerySearch,searchFunction}) {
  return (
    <>
      <SearchData setQuerySearch={setQuerySearch} searchFunction={searchFunction} />
      <FilterData/>
      <DownloadData/>
    </>
  )
}

export default ToolsApp