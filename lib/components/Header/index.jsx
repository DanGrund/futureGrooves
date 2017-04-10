import React, { Component } from 'react';
import './header-style';
import { Link } from 'react-router-dom';
import Login from './Login';
import Logout from './Logout';
import LoginModal from './LoginModal';

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false,
      loginModal: false
    }
  }

  render() {
    const displayLoginModal = () => {
      if(this.state.loginModal) { return <LoginModal /> }
    }

    return (
      <div className="header">
        <Link to='/'><h1>FutureGrooves</h1></Link>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/newsound'>New Sound</Link>
          <Link to='/sequencer'>Sequencer</Link>
          <Link to='/profile'>Profile</Link>


          <div className='sign-in-container'>
            <Link to='/sign-up'>Sign Up</Link>
            <button onClick={() => this.setState({ loginModal: !this.state.loginModal })}>Sign-in</button>
            {displayLoginModal()}
          </div>
        </nav>
      </div>
    )
  }
}
