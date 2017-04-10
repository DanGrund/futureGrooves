
const ActiveUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user
    case 'DUPLICATE':
      return { error: action.error, type: action.type }
    case 'NOT_FOUND':
      return { error: action.error, type: action.type }
    case 'LOGOUT':
      return {}
    default:
      return state;
  }
}

export default ActiveUser;
