import React, { Component } from 'react';
import { Link } from 'react-router';
import UserContainer from '../../containers/UserContainer'
import IndividualSong from '../IndividualSong/IndividualSong'


export class UserProfile extends Component {
  constructor() {
    super();
    // this.state = {
    //   name: 'Kanye West'
    // }
  }

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
     return <div key={i}>
              <h3 id={sound.id}>Sound: {title}</h3>
                <button onClick={() => this.props.previewSound(spec)}>Play</button>
                <button onClick={this.stopSound.bind(this)}>Stop</button>
                <button onClick={() => this.props.openUserSound(spec, sound.id)}>Edit</button>
            </div>
   })
}

loadComps(){
  return this.props.userData.compositions.map((comp, i) => {
    return <div key={i}>
              <h3>Comp:</h3>
              {/* <IndividualSong /> */}
          </div>
  })
}

  render() {
    return(
      <div>
        {/* <h1>UserProfile</h1> */}
        <section id="user-stream">
            <header>
              <h2 id="user-stream-name">{this.props.user && this.props.user}</h2>
              <h3>26 compositions</h3>
              <h3>member since 2017</h3>
            </header>
        <section id="user-stream-audio">
        </section>
        <h2>Comps</h2>
          {this.props.userData.compositions && <div>{this.loadComps()}</div>}
        <section id="user-sounds">
          <h2>Sounds</h2>
            {this.props.userData.sounds && <div>{this.loadSounds()}</div>}
        </section>
        </section>
      </div>
    )
  }
}

export default UserContainer(UserProfile);
