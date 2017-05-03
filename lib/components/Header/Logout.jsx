import React from 'react'
import { NavLink } from 'react-router-dom'

const Logout = ({ location, activeUser, handleLogout }) => {
  if (activeUser === undefined) {
    return null
  }

  return (
    <div className='logout'>
      <NavLink to={`/profile/${activeUser.username}`} exact className='nav-link--profile' activeClassName='active-nav-link'>Profile</NavLink>
      <button className='btn btn-logout' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
