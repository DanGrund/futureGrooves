import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import UserProfile from '../UserProfile'
import UserContainer from '../../containers/UserContainer'
import SequencerContainer from '../../containers/SequencerContainer'
import Sequencer from '../Sequencer'
import SoundMakerContainer from '../../containers/SoundMakerContainer'
import SoundMaker from '../../components/SoundMaker'
import Header from '../Header'
import Home from '../Home'
import CreateNewUser from '../CreateNewUser'

export class App extends Component {
  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/newsound' component={SoundMaker} />
          <Route exact path='/sequencer' component={SequencerContainer} />
          <Route exact path='/profile/:username' component={UserProfile} />
          <Route exact path='/sign-up' component={CreateNewUser} />
        </Switch>
      </div>
    )
  }
}

export default App
