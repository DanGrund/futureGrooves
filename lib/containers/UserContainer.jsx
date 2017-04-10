import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, postNewUser, logoutUser, loginUser } from '../actions'

import UserProfile from '../components/UserProfile'

const mapDispatchToProps = {
  fetchUser,
  postNewUser,
  logoutUser,
  loginUser
}

const mapStateToProps = (state) => {
  return {
    user: state.ActiveUser.username,
    error: state.ActiveUser || false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
