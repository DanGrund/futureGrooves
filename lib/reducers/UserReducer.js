const UserReducer = (state=0, action) => {
  switch(action.type) {
    case 'INCREASE':
      return state += action.count;
    case 'DECREASE':
      return state -= action.count;
    default:
      return state;
  }
}

export default UserReducer;
