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

  shouldComponentUpdate(nextProps, nextState){
    return nextProps.userData !== this.props.userData
  }

  stopSound = () => {
    this.props.stopSound()
  }

  loadSounds(){
   return this.props.userData.sounds.map((sound, i) => {
     let spec = JSON.parse(sound.attributes)
     let title = spec.soundName ? spec.soundName : 'untitled'
     return <div className='sound-container' key={i}>
       <h3 className='sound-title' id={sound.id}>{title.substring(0,7)}</h3>
       <div className='composition-controls'>
         <button className='btn-play' onClick={() => this.props.previewSound(spec)}></button>
         <button className='btn btn-sm btn-edit' onClick={() => this.props.openUserSound(spec, sound.id)}>Edit</button>
         <button className='btn btn-sm btn-delete' onClick={() => this.props.deleteSound(sound.id)}>Delete</button>
       </div>
     </div>
   })
 }

  loadComps(){
    return this.props.userData.compositions.map((comp, i) => {
      let attributes = (JSON.parse(comp.attributes))
      if(attributes) {
        return (
          <IndividualSong className="btn-play"
            key={i}
            name={attributes.compositionName}
            trackRacks={attributes.trackRacks}
            tempo={attributes.tempo}
            handleDelete={() => this.props.deleteComposition(comp.id)}
            handleEdit={() => this.props.openUserComposition(comp.attributes, comp.id)}/>
        )
      }
    })
  }

  render() {
    const { user, userData } = this.props
    return (
        <div className='user-profile-container'>

          <header id="user-stats">
            <h2 className='user-headers' className='user-stream-name'>{user && user}</h2>
            <h3 className='user-headers'> / Compositions : {userData.compositions && userData.compositions.length } / </h3>
            <h3 className='user-headers'> Member since 2017</h3>
          </header>

          <section className='user-stream'>

            <section className='user-stream-audio'>
              <h2 className='user-headers'> Compositions </h2>
              {userData.compositions && <div>{this.loadComps()}</div>}
            </section>

            <section className='user-sounds'>
              <h2 className='user-headers'> Sounds</h2>
              {userData.sounds && <div>{this.loadSounds()}</div>}
            </section>

          </section>

        </div>
    )
  }
}

export default UserContainer(UserProfile);
