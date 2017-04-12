const sounds = (state = [], action) => {
  switch (action.type) {
    case 'PUSH_SOUND':
      return state.concat(action.sound)
    case 'PLAY_SOUND':
      return state
    case 'POP_SOUND':
      return [...state.slice(0, -1)]
    case 'CLEAR_SOUNDS':
      return []
    case 'SET_SOUNDS':
      return {library: action.sounds}
    default:
      return state
  }
}

export default sounds
