import React from 'react';

const Logout = ({ username, handleLogout }) => {
  return (
    <div className='logout'>
      <h1>Welcome, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout;
