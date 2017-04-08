import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import UserProfile from '../UserProfile'
import UserContainer from '../../containers/UserContainer'
import Sequencer from '../Sequencer'
import SoundMaker from '../SoundMaker'
import Header from '../Header'
import Home from '../Home'

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/newsound' component={SoundMaker} />
          <Route path='/sequencer' component={Sequencer} />
          <Route path='/profile' component={UserProfile} />
        </Switch>
      </div>
    )
  }
}

export default App
