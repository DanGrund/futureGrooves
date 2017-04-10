export const duplicateError = (error) => {
  return {
    type: 'DUPLICATE',
    error
  }
}

export const store = (name) => {
  return {
    type: 'STORE',
    name
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    user,
  }
}

export const removeUser = () => {
  return { type: 'LOGOUT' }
}

export const logoutUser = () => {
  localStorage.removeItem('activeUser');
  return (dispatch) => {
    dispatch(removeUser())
  }
}

const saveUser = (user) => {
  localStorage.setItem('activeUser', user.username)
}

const handleError = (error, dispatch) => {
  let field;
  switch(error) {
    case 'users_username_unique':
      field = 'Username'
      break;
    case 'users_email_unique':
      field = 'Email'
      break;
    default:
      field = 'Email and/or Username'

  }
  const msg = `${field} already exists. Please sign in or try a different ${field}`
  dispatch(duplicateError(msg))
}

export const fetchUser = () => {
  const baseUrl = 'http://localhost:3000/api/v1/users'
  return (dispatch) => {
    fetch(`${baseUrl}`)
      .then(response => response.json())
      .then((json) => {
        dispatch(setUser(json))
      })
      .catch(err => 'err')
  }
}

export const postNewUser = (userCreds) => {
  return (dispatch) => {
    fetch('api/v1/users', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userCreds)
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        handleError(data.error, dispatch)
      } else {
        const { id, username, email } = data[0];
        const user = { id, username, email }
        dispatch(setUser(user))
        saveUser(user)
      }
    })
   })
  }
}
