const sounds = (state = { previews: [] }, action) => {
  switch (action.type) {
    case 'PUSH_SOUND':
      let previews = state.previews.slice()
      previews.push(action.sound)
      return Object.assign({}, state, { previews })
    case 'PLAY_SOUND':
      return state
    case 'EDIT_SOUND':
      return Object.assign({}, state, { editsound: action.sound, id: action.id })
    case 'POP_SOUND':
      return Object.assign({}, state, { previews: [] })
    case 'CLEAR_SOUNDS':
      return Object.assign({}, state, { previews: [] })
    case 'SET_SOUNDS':
      return Object.assign({}, state, { library: action.sounds })
    case 'EDIT_COMPS':
      return Object.assign({}, state, { editcomp: action.comp, id: action.id })
    case 'SET_COMPS':
      return Object.assign({}, state, {comps: action.comp})
    default:
      return state
  }
}

export default sounds
