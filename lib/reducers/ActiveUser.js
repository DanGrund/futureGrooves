const ActiveUser = (state= {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        email: action.user.email,
        username: action.user.username,
      }
    case 'DUPLICATE':
      return {error: action.error}
    default:
      return state;
  }
}

export default ActiveUser;
