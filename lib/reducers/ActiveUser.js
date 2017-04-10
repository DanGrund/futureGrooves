const ActiveUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      const { id, email, username } = action.user
      return { id, email, username }
    case 'DUPLICATE':
      return { error: action.error }
    case 'LOGOUT':
      return {}
    default:
      return state;
  }
}

export default ActiveUser;
