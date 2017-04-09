import React from 'react'
import { render } from 'react-dom'
import { AppContainer as HotReloader } from 'react-hot-loader'
import Root from './components/Root'
import './styles.scss'
import configureStore from './store'

const { store, history } = configureStore({})

render(
  <HotReloader>
    <Root store={store} history={history} />
  </HotReloader>,
  document.getElementById('root')
)

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
