import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import UserProfile from '../components/UserProfile'

const mapDispatchToProps = {
  fetchUser,
}

const mapStateToProps = (state) => {
  console.log(state.UserReducer.user)
  return {
    user: state.UserReducer.user,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
