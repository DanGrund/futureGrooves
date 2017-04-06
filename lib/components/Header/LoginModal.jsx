import React from 'react';

const Login = () => {
  return (
    <div className='login-modal'>
      <label>
        Email
        <input className='input email'
          placeholder='Email'
          type='text'/>
      </label>

      <label>
        Password
        <input className='input password'
          placeholder='Password'
          type='password'/>
      </label>

      <button className='btn submit'>Submit</button>
    </div>
  )
}

export default Login;
