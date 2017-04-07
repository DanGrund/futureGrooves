import React, { Component } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'

const mapDispatchToProps = (dispatch) => {
  return {
    increase: () => {
      dispatch(increase(1))
    },
    decrease: () => {
      dispatch(decrease(1))
    },
    storeShit: (name) => {
      dispatch(store(name))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.handleCount
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
