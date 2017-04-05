// import './reset'
import './styles';
import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/index';

import App from './components/App/App';
import Home from './components/Home/Home';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

const router = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        {/* <IndexRoute component={MovieListContainer} /> */}
        <Route path='/home' component={Home} />
        {/* <Route path='/favorites' component={FavoritesContainer} /> */}
        {/* <Route path='/movies/:movie_title' component={MovieDetail} /> */}
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('application'));
