import React from 'react'
import { connect } from 'react-redux'
import { previewSound, stopSound, stopAllSounds, saveSound, loadSound } from '../actions'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
    user: state.ActiveUser
  }
}

const mapDispatchToProps = {
  previewSound,
  stopSound,
  stopAllSounds,
  saveSound,
  loadSound
}

export default connect(mapStateToProps, mapDispatchToProps)
