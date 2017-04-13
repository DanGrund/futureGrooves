import React, { Component } from 'react';
import { Link } from 'react-router';
import UserContainer from '../../containers/UserContainer'

var sampleAudio = "https://www.random.org/audio-noise/?channels=2&volume=100&rate=16000&size=8&date=2017-04-06&format=wav&deliver=browser"

export class UserProfile extends Component {
  constructor() {
    super();
    // this.state = {
    //   name: 'Kanye West'
    // }
  }

  componentWillMount(){
    const {id, token } = this.props.userData
    this.props.fetchUserData(id, token)
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
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
          <audio src={sampleAudio} preload="none" controls></audio>
        </section>
        <section id="user-sounds">
          <h2>Sounds</h2>
          <ul>
            <li>808 slap<audio src={sampleAudio} preload="none" controls></audio><button>fork</button></li>
            <li>808 snare<audio src={sampleAudio} preload="none" controls></audio><button>fork</button></li>
            <li>808 hat<audio src={sampleAudio} preload="none" controls></audio><button>fork</button></li>
            <li>E40<audio src={sampleAudio} preload="none" controls></audio><button>fork</button></li>
          </ul>
        </section>
        </section>
      </div>
    )
  }
}

export default UserContainer(UserProfile);
