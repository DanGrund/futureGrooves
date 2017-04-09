import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotReloader } from 'react-hot-loader'
import Root from './components/Root'
import './styles.scss'
import configureStore from './store'

const { store, history } = configureStore({})

delete HotReloader.prototype.unstable_handleError

render(
  <HotReloader>
    <Root store={store} history={history} />
  </HotReloader>,
  document.getElementById('root')
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NextRoot = require('./components/Root/index.jsx').default
    render(
      <HotReloader>
        <NextRoot store={store} history={history}/>
      </HotReloader>,
      document.getElementById('root')
    )
  })
}
