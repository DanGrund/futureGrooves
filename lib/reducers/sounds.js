const sounds = (state = [], action) => {
  switch (action.type) {
    case 'PUSH_SOUND':
      return state.concat(action.sound)
    case 'PLAY_SOUND':
      return state
    case 'EDIT_SOUND':
      return {editsound: action.sound, id: action.id}
    case 'POP_SOUND':
      return [...state.slice(0, -1)]
    case 'CLEAR_SOUNDS':
      return []
    case 'SET_SOUNDS':
      return {library: action.sounds}
    case 'EDIT_COMPS':
      return {editcomp: action.comp, id: action.id}
    case 'SET_COMPS':
      return {comps: action.comp}
    default:
      return state
  }
}

export default sounds
