import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import HeaderContainer from '../containers/HeaderContainer'
import ReduxThunk from 'redux-thunk'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// import promiseMiddleware from 'redux-promise-middleware'
// import { loadingBarMiddleware } from 'react-redux-loading-bar'
// import theme from 'reapop-theme-bootstrap'
// import NotificationsSystem from './NotificationsSystem'
import App from './App'
import Home from '../components/Home/Home'

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(ReduxThunk)
  ))

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='app'>
            <div className='content'>
              <Route path='/' component={Home} />
            </div>
          </div>
        </Router>
      </Provider>
    )
  }
}
