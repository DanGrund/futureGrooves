import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import CompositionReducer from './CompositionReducer'
import sounds from './sounds'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  router: routerReducer,
  UserReducer,
  CompositionReducer,
  sounds,
})

export default rootReducer
