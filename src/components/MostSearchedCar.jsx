import React from 'react'
import FakeData from '@/Shared/FakeData'
import CarItem from './CarItem'

function MostSearchedCar() {
  return (
   <div>
    <h2 className='font-bold text-3xl text-center my-8'>Most Searched Car</h2>

    {FakeData.carList.map(({car,index})=>(
        <CarItem car={car} leu={index}/>
    ))}
   </div>
    
 
    
  )
}

export default MostSearchedCar
