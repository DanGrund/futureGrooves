const UserReducer = (state= {}, action) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        email: action.payload[1].email,
        user: action.payload[1].name,
      }
    default:
      return state;
  }
}

export default UserReducer;
