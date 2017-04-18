import React, { Component } from 'react'
import './new-user-styles.scss'
import UserContainer from '../../containers/UserContainer'
import { NavLink } from 'react-router-dom'

export class CreateNewUser extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
      checkbox: false
    }
  }

  submitNewUser() {
    const { username, email, password } = this.state
    if(username && email && password) {
      this.props.postNewUser({ username, email, password })
      this.setState({ username: '', email: '', password: '' })
    }
  }

  render() {
    const { username, email, password, checkbox } = this.state

    const errorMessage = () => {
      const { userData } = this.props
      if(userData.type === 'DUPLICATE') {
        return (
          <div className='error-msg'>{userData.msg}</div>
        )
      }
    }

    return (
      <div className='new-user-form-container'>
        {errorMessage()}
        <form className='form new-user-form'>
          <p><sup>*</sup> denotes a required field</p>
          <label>
            Username<sup>*</sup>
            <input placeholder='username'
              className='input new-user-input input--username'
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}/>
          </label>
          <label>
            Email<sup>*</sup>
            <input placeholder='email'
              className='input new-user-input input--email'
              value={email}
              onChange={(e) => this.setState({ email: e.target.value})}/>
          </label>
          <label>
            Password<sup>*</sup>
            <input placeholder='password'
              className='input new-user-input input--password'
              type='password'
              value={password}
              onChange={(e) => this.setState({ password: e.target.value})}/>
          </label>
          <label>
            I have read and agree to the <NavLink to='/terms'>Terms of Service</NavLink><sup>*</sup>
            <input type='checkbox' onChange={() => this.setState({ checkbox: !this.state.checkbox })}/>
          </label>
          <button className='btn btn-submit new-user-submit'
                  disabled={!username || !email || !password || !checkbox}
                  onClick={this.submitNewUser.bind(this)}>
            Submit
          </button>
        </form>
      </div>
    )
  }
}

export default UserContainer(CreateNewUser)
