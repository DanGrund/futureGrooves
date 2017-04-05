// import './reset'
import './styles';
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

import App from './components/App/App';
import UserProfile from './components/UserProfile/UserProfile';
import Sequencer from './components/Sequencer/Sequencer';
import SoundMaker from './components/SoundMaker/SoundMaker';
import Home from './components/Home/Home';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='/newsound' component={SoundMaker} />
        <Route path='/sequencer' component={Sequencer} />
        <Route path='/profile/:id' component={UserProfile} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('application'));
