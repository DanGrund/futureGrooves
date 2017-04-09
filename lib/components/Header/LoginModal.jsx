import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  attemptLogin(event) {
    const email = this.refs.email
    const password = this.refs.password
    const creds = { email: email.value.trim(), password: password.value.trim() }
    // this.props.onLoginClick(creds)
  }

  render() {
    return (
      <div className='login-modal'>
        <label>
          Email
          <input className='input email'
                 placeholder='Email'
                 type='text'
                 ref='email'
                 onChange={(e) => this.setState({ email: e.target.value })}/>
        </label>

        <label>
          Password
          <input className='input password'
                 placeholder='Password'
                 type='password'
                 ref='password'
                 onChange={(e) => this.setState({ password: e.target.value })} />
        </label>

        <button className='btn submit'
                onClick={this.attemptLogin.bind(this)}>
          Submit
        </button>
      </div>
        )
  }
}
