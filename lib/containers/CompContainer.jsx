import React from 'react'
import { connect } from 'react-redux'
import { fetchAllCompositions, deleteComposition, fetchUserData } from '../actions'

const mapStateToProps = (state) => {
  return {
    sound: state.sounds,
    user: state.ActiveUser,
    comps: state.comps
  }
}

const mapDispatchToProps = {
  fetchAllCompositions,
  fetchUserData,
  deleteComposition
}

export default connect(mapStateToProps, mapDispatchToProps)
