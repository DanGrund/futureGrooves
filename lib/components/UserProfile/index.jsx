import React, { Component } from 'react';
import { Link } from 'react-router';
import UserContainer from '../../containers/UserContainer'
import './user-profile.scss'

export class UserProfile extends Component {
  componentWillMount() {
    const {id, token } = this.props.userData
    this.props.fetchUserData(id, token)
  }

  stopSound = () => {
    this.props.stopSound()
  }

  loadSounds() {
    return this.props.userData.sounds.map((sound, i) => {
      let spec = JSON.parse(sound.attributes)
      let title = spec.soundName ? spec.soundName : 'untitled'
      return (
        <div className='sound-container' key={i}>
          <hr className='sound-hr' />
          <h3 className='sound-title' id={sound.id}>{title}</h3>
          <button className='btn btn-sm btn-play' onClick={() => this.props.previewSound(spec)}>Play</button>
          <button className='btn btn-sm btn-stop' onClick={this.stopSound.bind(this)}>Stop</button>
          <button className='btn btn-sm btn-edit' onClick={() => this.props.openUserSound(spec)}>Edit</button>
        </div>
      )
    })
  }

  render() {
    return (
      <div className='user-profile-container'>
        <section className='user-stream'>
          <header>
            <h2 className='user-stream-name'>{this.props.user && this.props.user}</h2>
            <h3>26 compositions</h3>
            <h3>member since 2017</h3>
          </header>
          <section className='user-stream-audio'></section>
          <section className='user-sounds'>
            <h2>Sounds</h2>
            {this.props.userData.sounds && <div>{this.loadSounds()}</div>}
          </section>
        </section>
      </div>
    )
  }
}

export default UserContainer(UserProfile);
