import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchUserData, saveComp } from '../actions'
// import Sequencer from '../components/Sequencer'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
    user: state.ActiveUser
  }
}

const mapDispatchToProps = {
  fetchUserData,
  saveComp
}

export default connect(mapStateToProps, mapDispatchToProps)
