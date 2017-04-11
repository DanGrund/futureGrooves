import React, { Component } from 'react'
import { connect } from 'react-redux'
import { previewSound, stopSound, stopAllSounds, saveSound } from '../actions'
import Sequencer from '../components/Sequencer'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
    user: state.ActiveUser
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Sequencer)
