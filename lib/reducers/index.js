import { combineReducers } from 'redux'
import ActiveUser from './ActiveUser'
import CompositionReducer from './CompositionReducer'
import sounds from './sounds'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  ActiveUser,
  router: routerReducer,
  CompositionReducer,
  sounds,
})

export default rootReducer
