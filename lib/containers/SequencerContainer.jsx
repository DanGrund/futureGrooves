import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchSounds } from '../actions'
import Sequencer from '../components/Sequencer'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
    user: state.ActiveUser
  }
}

const mapDispatchToProps = {
  fetchSounds,
}

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer)
