import React, { Component } from 'react';
import onClickOutside from 'react-onclickoutside';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }
  }

  loginUser(event) {
    const { email, password } = this.state;
    this.props.login({ email, password })
  }

  handleClickOutside() {
    this.props.hideModal()
  }

  submitWithEnter(e) {
    if(e.keyCode === 13) {
      this.loginUser()
    }
  }

  render() {
    const { email, password } = this.state

    return (
      <div className='login-modal'>
        <div className='close-modal-btn'
             onClick={this.props.hideModal}>×</div>

        <div className='login-form'>
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
                onChange={(e) => this.setState({ password: e.target.value })}
                onKeyDown={(e) => this.submitWithEnter(e)}/>
              </label>

              <button className='btn submit'
                      onClick={this.loginUser.bind(this)}
                      disabled={!email || !password}>
                Submit
              </button>
        </div>
        <div className='not-found-error'>
          {this.props.error}
        </div>
      </div>
    )
  }
}

export default onClickOutside(Login)
