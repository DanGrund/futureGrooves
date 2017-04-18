import { combineReducers } from 'redux'
import ActiveUser from './ActiveUser'
import comps from './comps'
import sounds from './sounds'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  ActiveUser,
  router: routerReducer,
  comps,
  sounds,
})

export default rootReducer
