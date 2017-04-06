import React from 'react'
import './header-style'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="Header">
      <Link to='/'><h1>FutureGrooves</h1></Link>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/newsound'>New Sound</Link>
        <Link to='/sequencer'>Sequencer</Link>
        <Link to='/profile'>Profile</Link>
      </nav>
    </div>
  )
}

export default Header;
