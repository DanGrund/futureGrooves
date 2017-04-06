import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer as HotReloader } from 'react-hot-loader'
import Root from './containers/Root'

ReactDOM.render(
  <HotReloader>
    <Root/>
  </HotReloader>,
  document.getElementById('root')
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root.jsx').default
    ReactDOM.render(
      <HotReloader>
        <NextRoot/>
      </HotReloader>,
      document.getElementById('root')
    );
  });
}