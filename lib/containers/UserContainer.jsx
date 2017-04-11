import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, postNewUser, logoutUser, loginUser, userError } from '../actions'

import UserProfile from '../components/UserProfile'

const mapDispatchToProps = {
  fetchUser,
  postNewUser,
  logoutUser,
  loginUser,
  userError
}

const mapStateToProps = (state) => {
  return {
    user: state.ActiveUser.username,
    error: state.ActiveUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
