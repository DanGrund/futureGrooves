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
    const email = this.refs.email.value
    const password = this.refs.password.value
    const creds = { email, password };
    this.props.attemptLogin(creds)
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
                 autoFocus
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
