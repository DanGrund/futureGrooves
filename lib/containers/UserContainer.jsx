import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'
import { bindActionCreators } from 'redux'

import UserProfile from '../components/UserProfile'

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}

const mapStateToProps = (state) => {
  return {
    user: state.ActiveUser.username,
    userData: state.ActiveUser,
    activeUser: state.ActiveUser,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)
