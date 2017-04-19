const comps = (state={}, action) => {
  switch(action.type) {
    case 'SET_ALL_COMPOSITIONS':
      return Object.assign({}, state, {data: action.data})
    default:
      return state;
  }
}

export default comps;
