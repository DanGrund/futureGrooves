import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, postNewUser, logoutUser } from '../actions'

import UserProfile from '../components/UserProfile'

const mapDispatchToProps = {
  fetchUser,
  postNewUser,
  logoutUser,
  postNewUser
}

const mapStateToProps = (state) => {
  return {
    user: state.ActiveUser.username,
    error: state.ActiveUser.error || false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
