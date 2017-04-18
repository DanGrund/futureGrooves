import React from 'react'
import './TandCstyles.scss'
import { NavLink } from 'react-router-dom'

const TsAndCs = () => {
  return(
    <div className='terms-container'>
      <NavLink to='/sign-up' className='terms-back-btn'>Back</NavLink>
      <h1 className='termsAndConditions'>The Future is LIT AF</h1>
    </div>
  )
}

export default TsAndCs
