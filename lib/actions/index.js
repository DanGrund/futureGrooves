export const increase = (count) => {
  return {
    type: 'INCREASE',
    count
  }
}

export const decrease = (count) => {
  return {
    type: 'DECREASE',
    count
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
    }).then(res => res.json())
      .then(data => {
        const user = {
          username: data[0].username,
          email: data[0].email
        }
        dispatch(setUser(user))
      })
  }
}
