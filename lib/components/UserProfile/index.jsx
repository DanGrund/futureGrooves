import React, { Component } from 'react';
import { Link } from 'react-router';
import UserContainer from '../../containers/UserContainer'
import './user-profile.scss'
import IndividualSong from '../IndividualSong/IndividualSong'

export class UserProfile extends Component {
  componentWillMount() {
    const {id, token } = this.props.userData
    this.props.fetchUserData(id, token)
  }

  stopSound = () => {
    this.props.stopSound()
  }

  loadSounds(){
   return this.props.userData.sounds.map((sound, i) => {
     let spec = JSON.parse(sound.attributes)
     let title = spec.soundName ? spec.soundName : 'untitled'
     return <div className='sound-container' key={i}>
       <hr className='sound-hr' />
       <h3 className='sound-title' id={sound.id}>{title}</h3>
       <button className='btn btn-play' onClick={() => this.props.previewSound(spec)}></button>
       <button className='btn btn-sm btn-stop' onClick={this.stopSound.bind(this)}>Stop</button>
       <button className='btn btn-sm btn-edit' onClick={() => this.props.openUserSound(spec, sound.id)}>Edit</button>
     </div>
   })
}

loadComps(){
  return this.props.userData.compositions.map((comp, i) => {
    let attributes = (JSON.parse(comp.attributes))
    return <IndividualSong className="btn-play" key={i} name={attributes.soundName} trackRacks={attributes.trackRacks} tempo={attributes.tempo}/>
  })
}

  render() {
    return (
      <div className='user-profile-container'>
        <section className='user-stream'>
          <header>
            <h2 className='user-headers' className='user-stream-name'>{this.props.user && this.props.user}</h2>
            <h3 className='user-headers'> / Compositions : {this.props.userData.compositions.length} / </h3>
            <h3 className='user-headers'> Member since 2017</h3>
          </header>
          <section className='user-stream-audio'>
            <h2 className='user-headers'> Compositions </h2>
            {this.props.userData.compositions && <div>{this.loadComps()}</div>}
          </section>
          <section className='user-sounds'>
            <h2 className='user-headers'> Sounds</h2>
            {this.props.userData.sounds && <div>{this.loadSounds()}</div>}
          </section>
        </section>
      </div>
    )
  }
}

export default UserContainer(UserProfile);
