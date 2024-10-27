import { UserButton, useUser } from '@clerk/clerk-react'
import React from 'react'
import { Button } from './ui/button'

function Header() {
  const {user, isSignedIn} = useUser()

  return (
    <div>
      <img src='/logo.svg' width={150} height={100}/>
      <ul>
        <li>Home</li>
        <li>Search</li>
        <li>New</li>
        <li>Preowned</li>
      </ul>
      {isSignedIn? 
      
    <div>
      <UserButton/>
      <Button>Submit Listing</Button>
    </div> :
    <Button>Submit Listing</Button>
    }
    </div>
  )
}

export default Header
