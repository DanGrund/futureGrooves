import React, { Component } from 'react'
import './new-user-styles.scss'
import UserContainer from '../../containers/UserContainer'

export class CreateNewUser extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      email: '',
      password: '',
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
    const { username, email, password } = this.state

    const errorMessage = () => {
      const { error } = this.props
      if(error) {
        return (
          <div className='error-msg'>{error}</div>
        )
      }
    }

    return (
      <div className='new-user-form-container'>
        {errorMessage()}
        <h1>New User!</h1>
        <div className='new-user-form'>
          <input placeholder='username'
                 className='new-user-input'
                 value={username}
                 onChange={(e) => this.setState({ username: e.target.value })}/>
          <input placeholder='email'
                 className='new-user-input'
                 value={email}
                 onChange={(e) => this.setState({ email: e.target.value})}/>
          <input placeholder='password'
                 className='new-user-input'
                 type='password'
                 value={password}
                 onChange={(e) => this.setState({ password: e.target.value})}/>
          <button className='new-user-submit'
                  disabled={!username || !email || !password}
                  onClick={this.submitNewUser.bind(this)}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default UserContainer(CreateNewUser)
