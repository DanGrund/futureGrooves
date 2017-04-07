import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../actions'
import SoundMaker from '../components/SoundMaker'

const mapStateToProps = (state) => {
  return {
    sound: state.sound
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(SoundMaker)
