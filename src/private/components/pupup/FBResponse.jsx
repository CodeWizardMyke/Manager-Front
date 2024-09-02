import React from 'react'
import './FBResponse.css'
function FBResponse({msg}) {

  return (
    <div className='FBResponse'>
      <h3>{msg}</h3>
    </div>
  )
}

export default FBResponse