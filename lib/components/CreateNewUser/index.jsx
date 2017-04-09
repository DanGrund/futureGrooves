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
    }
  }


  render() {
    return (
      <div className='new-user-form-container'>
        <h1>New User!</h1>
        <div className='new-user-form'>
          <input placeholder='username'
                 className='new-user-input'
                 onChange={(e) => this.setState({ username: e.target.value })}/>
          <input placeholder='email'
                 className='new-user-input'
                 onChange={(e) => this.setState({ email: e.target.value})}/>
          <input placeholder='password'
                 className='new-user-input'
                 onChange={(e) => this.setState({ password: e.target.value})}/>
          <button className='new-user-submit'
                  onClick={this.submitNewUser.bind(this)}>
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default UserContainer(CreateNewUser)
