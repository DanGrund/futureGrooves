import React from 'react'
import { connect } from 'react-redux'
import { previewSound, stopSound, stopAllSounds, saveSound } from '../actions'
import SoundMaker from '../components/SoundMaker'

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
  saveSound
}

export default connect(mapStateToProps, mapDispatchToProps)(SoundMaker)
