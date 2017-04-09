import React from 'react'
import { Provider } from 'react-redux'
// import configureStore from './store'
// import { createStore, applyMiddleware, compose } from 'redux'
// import rootReducer from '../reducers'
// import createHistory from 'history/createBrowserHistory'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// import ReduxThunk from 'redux-thunk'
import { ConnectedRouter, push } from 'react-router-redux'

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
// const history = createHistory()


// import App from './containers/App/App';

// import Home from './components/Home/Home';

// import promiseMiddleware from 'redux-promise-middleware'
// import { loadingBarMiddleware } from 'react-redux-loading-bar'
// import theme from 'reapop-theme-bootstrap'
// import NotificationsSystem from './NotificationsSystem'
import AppContainer from '../../containers/AppContainer'

// const store = createStore(rootReducer, composeEnhancers(
//   //   applyMiddleware(ReduxThunk, routerMiddleware(history))
//   // ))


// if (process.env.NODE_ENV !== 'production') {
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers').default
//       store.replaceReducer(nextRootReducer)
//     })
//   }
// }

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history} >
          <Route path='/' component={AppContainer} />
        </ConnectedRouter>
      </Provider>
    )
  }
}

