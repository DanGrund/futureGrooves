import React, { Component } from 'react';
import './header-style';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import LoginModal from './LoginModal';
import UserContainer from '../../containers/UserContainer';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loginModal: false,
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
                           hideModal={() => this.hideModal()}/>
      }
    }

    const noUserOptions = () => {
      return (
        <div className='sign-in-container'>
          <Link to='/sign-up'>Sign Up</Link>
          <button onClick={() => this.setState({ loginModal: true })}>Sign-in</button>
          {displayLoginModal()}
        </div>
      )
    }

    const activeUserOptions = () => {
      return (
        <div className='logout-container'>
          <Link to={`/profile/${this.props.user}`}>Profile</Link>
          <Logout handleLogout={this.logoutUser.bind(this)} username={this.props.user}/>
        </div>
      )
    }

    const userNotFound = () => {
      const { error } = this.props
      if(error.type === 'NOT_FOUND') {
        return error.msg
      }
    }

    return (
      <div className="header">
        <Link to='/'><h1>FutureGrooves</h1></Link>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/newsound'>New Sound</Link>
          <Link to='/sequencer'>Sequencer</Link>


          { this.props.user ? activeUserOptions() : noUserOptions() }

        </nav>
      </div>
    )
  }
}

export default UserContainer(Header);
