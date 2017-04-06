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


export const setUser = (payload) => {
  return {
    type: 'SET_USER',
    payload,
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
