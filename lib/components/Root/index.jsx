import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ConnectedRouter, push } from 'react-router-redux'

import AppContainer from '../../containers/AppContainer'

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

