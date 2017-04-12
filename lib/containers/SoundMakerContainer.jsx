import React from 'react'
import { connect } from 'react-redux'
import { previewSound, stopSound, stopAllSounds } from '../actions'
import SoundMaker from '../components/SoundMaker'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
  }
}

const mapDispatchToProps = {
  previewSound,
  stopSound,
  stopAllSounds,
}


export default connect(mapStateToProps, mapDispatchToProps)(SoundMaker)
