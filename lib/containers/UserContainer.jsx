import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser, postNewUser } from '../actions'
import UserProfile from '../components/UserProfile'

const mapDispatchToProps = {
  fetchUser,
  postNewUser
}

const mapStateToProps = (state) => {
  return {
    user: state.ActiveUser.username,
    error: state.ActiveUser.error || false
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
