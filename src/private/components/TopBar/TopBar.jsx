import React from 'react'
import './TopBar.css'

function TopBar({text, color}) {
  return (
    <div className={`TopBar ${ color }`}>{text}</div>
  )
}

export default TopBar