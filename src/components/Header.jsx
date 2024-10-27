import React from 'react'

function Header() {
  return (
    <div>
      <img src='/logo.svg' width={150} height={100}/>
      <ul>
        <li>Home</li>
        <li>Search</li>
        <li>New</li>
        <li>Preowned</li>
      </ul>
    </div>
  )
}

export default Header
