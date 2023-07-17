import React from 'react'
import Skateboarding from './Skateboarding.gif'
const Spinner = () => {
  return (
    <div className='text-center'>
      <img className='my-3'  src={Skateboarding} alt="loading" />
    </div>
  )
}
export default Spinner