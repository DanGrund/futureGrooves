import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import CompositionReducer from './CompositionReducer'
import sounds from './sounds'

const rootReducer = combineReducers({
  UserReducer,
  CompositionReducer,
  sounds,
})

export default rootReducer
