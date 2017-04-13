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
        <form className='new-user-form'>
          <label>
            Username<sup>*</sup>
            <input placeholder='username'
              className='new-user-input'
              value={username}
              onChange={(e) => this.setState({ username: e.target.value })}/>
          </label>
          <label>
            Email<sup>*</sup>
            <input placeholder='email'
              className='new-user-input'
              value={email}
              onChange={(e) => this.setState({ email: e.target.value})}/>
          </label>
          <label>
            Password<sup>*</sup>
            <input placeholder='password'
              className='new-user-input'
              type='password'
              value={password}
              onChange={(e) => this.setState({ password: e.target.value})}/>
          </label>
          <label>
            I have read and agree to the Terms of Service<sup>*</sup>
            <input type='checkbox' onChange={() => this.setState({ checkbox: !this.state.checkbox })}/>
          </label>
          <button className='new-user-submit'
                  disabled={!username || !email || !password || !checkbox}
                  onClick={this.submitNewUser.bind(this)}>
            Submit
          </button>
          <p><sup>*</sup> denotes a required field</p>
        </form>
      </div>
    )
  }
}

export default UserContainer(CreateNewUser)
