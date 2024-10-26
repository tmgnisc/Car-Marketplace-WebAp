import React from 'react'
import { Button } from './components/ui/button'
import { SignIn, SignInButton } from '@clerk/clerk-react'

const Home = () => {
  return (
    <div>
        <SignInButton mode='modal' forceRedirectUrl='/' >
     <Button>Sign in</Button>
     </SignInButton>
    </div>
  )
}

export default Home
