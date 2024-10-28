import React from 'react'

import Header from './components/Header'
import Hero from './components/Hero'

  import Category from './components/Category'
import MostSearchedCar from './components/MostSearchedCar'
import InfoSection from './components/InfoSection'

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header/>
      {/* hero */}
      <Hero/>

      {/* category */}

     <Category/>


     <MostSearchedCar/>
     <InfoSection/>
     
    </div>
  )
}

export default Home
