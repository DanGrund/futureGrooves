import React, { Component } from 'react'
import './header-style'
import { NavLink } from 'react-router-dom'
import Logout from './Logout'
import LoginModal from './LoginModal'
import UserContainer from '../../containers/UserContainer'
import { push } from 'react-router-redux'

export class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuthenticated: false,
      loginModal: false,
    }
  }

  componentWillMount() {
    const savedUser = JSON.parse(localStorage.getItem('activeUser'))
    if(savedUser) {
      this.props.setUserFromStorage(savedUser)
    }
  }

  componentWillUpdate(nextProps, nextState) {
    return nextProps.user !== this.props.user
  }

  logoutUser() {
    this.props.logoutUser()
    this.hideModal()
  }

  loginUser(creds) {
    this.props.loginUser(creds)
  }

  hideModal() {
    this.setState({ loginModal: false })
    this.props.userError('')
  }

  render() {
    const { user } = this.state

    const displayLoginModal = () => {
      if(this.state.loginModal) {
        return <LoginModal login={this.loginUser.bind(this)}
                           error={userNotFound()}
                           hideModal={() => this.hideModal()} />
      }
    }

    const noUserOptions = () => {
      return (
        <div className='auth-container'>
          <button className='btn btn-sign-up nav-btn-sign-up' onClick={() => this.props.goToSignUpPage()}>Sign Up</button>
          <button className='btn btn-login nav-btn-login' onClick={() => this.setState({ loginModal: true })}>Login</button>
          {displayLoginModal()}
        </div>
      )
    }

    const activeUserOptions = () => {
      return (
        <div className='logout-container'>
          <NavLink to={`/profile/${this.props.user}`} exact className='nav-link--profile' activeClassName='active-nav-link'>Profile</NavLink>
          <Logout handleLogout={this.logoutUser.bind(this)} username={this.props.user} />
        </div>
      )
    }

    const userNotFound = () => {
      const { userData } = this.props
      if (userData.type === 'NOT_FOUND') {
        return userData.msg
      }
    }

    return (
      <div className='header'>
        <NavLink to='/' className='logo' activeClassName='active-nav-link'><h1 className='logo--title'>FutureGrooves</h1></NavLink>
        <nav className='nav'>
          <NavLink to='/newsound' exact className='nav-link--new-sound' activeClassName='active-nav-link'>New Sound</NavLink>
          <NavLink to='/sequencer' exact className='nav-link--sequencer' activeClassName='active-nav-link'>Sequencer</NavLink>
          { this.props.user ? activeUserOptions() : noUserOptions() }
        </nav>
      </div>
    )
  }
}

export default UserContainer(Header)
