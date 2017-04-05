import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import HeaderContainer from '../containers/HeaderContainer'
import ReduxThunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// import App from './containers/App/App';
import UserProfile from '../components/UserProfile';
import Sequencer from '../components/Sequencer';
import SoundMaker from '../components/SoundMaker';
// import Home from './components/Home/Home';

// import promiseMiddleware from 'redux-promise-middleware'
// import { loadingBarMiddleware } from 'react-redux-loading-bar'
// import theme from 'reapop-theme-bootstrap'
// import NotificationsSystem from './NotificationsSystem'
import Header from '../components/Header'
import AppContainer from './AppContainer'
import Home from '../components/Home/'

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)
  ))

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
           <Header />
            <div className='content'>
              <Route path='/' component={AppContainer} />
              <Route path='/newsound' component={SoundMaker} />
              <Route path='/sequencer' component={Sequencer} />
              <Route path='/profile/:id' component={UserProfile} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}

