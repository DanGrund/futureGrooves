const ActiveUser = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'USER_ERROR':
      return Object.assign({}, state, { msg: action.error.msg, type: action.error.type })
    case 'LOGOUT':
      return {}
    case 'SET_USER_DATA':
      const stateWithData = Object.assign({}, state, action.userData)
      return stateWithData
    case 'SELECTED_SOUND':
      const selectedSound = Object.assign({}, state, { selectedSound: action.sound, sound_id: action.id })
      return selectedSound
    case 'SELECTED_COMPOSITION':
      const selectedComp = Object.assign({}, state, { selectedComposition: action.composition, composition_id: action.id })
      return selectedComp
    default:
      return state
  }
}

export default ActiveUser
