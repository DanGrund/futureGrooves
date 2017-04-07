import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import ReduxThunk from 'redux-thunk'
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createHistory()

import AppContainer from './AppContainer'
import Home from '../components/Home/'

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk, routerMiddleware(history))
  ))

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Route path='/' component={AppContainer} />
        </ConnectedRouter>
      </Provider>
    )
  }
}

