import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import CompositionReducer from './CompositionReducer'
import SoundReducer from './SoundReducer'
import { routerReducer } from 'react-router-redux'

const rootReducer = combineReducers({
  router: routerReducer,
  UserReducer,
  CompositionReducer,
  SoundReducer,
})

export default rootReducer
