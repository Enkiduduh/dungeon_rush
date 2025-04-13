import React from 'react'

function Cards({type, value, displayData, isActive}) {
  return (
    <div className="cards-container" id={isActive ? "cards-flex" : null} onClick={displayData}>
      <div className="cards-text">{type} {value}</div>
    </div>
  )
}

export default Cards
