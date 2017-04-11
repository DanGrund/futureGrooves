
const ActiveUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user
    case 'USER_ERROR':
      return { msg: action.error.msg, type: action.error.type }
    case 'LOGOUT':
      return {}
    default:
      return state;
  }
}

export default ActiveUser;
