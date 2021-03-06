import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUser } from '../actions'
import App from '../components/App'

const mapDispatchToProps = {
  fetchUser,
}

const mapStateToProps = (state) => {
  return {
    count: state.handleCount
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
