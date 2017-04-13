
const ActiveUser = (state = {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return action.user
    case 'USER_ERROR':
      return { msg: action.error.msg, type: action.error.type }
    case 'LOGOUT':
      return {}
    case 'SET_USER_DATA':
      const stateWithData = Object.assign({}, state, action.userData)
      return stateWithData
    default:
      return state
  }
}

export default ActiveUser;
