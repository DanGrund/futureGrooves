import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import UserProfile from '../UserProfile'
import Sequencer from '../Sequencer'
import SoundMakerContainer from '../../containers/SoundMakerContainer'
import Header from '../Header'
import Home from '../Home'

export class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/newsound' component={SoundMakerContainer} />
          <Route path='/sequencer' component={Sequencer} />
          <Route path='/profile' component={UserProfile} />
        </Switch>
      </div>
    )
  }
}

export default App
