import { combineReducers } from 'redux'
import UserReducer from './UserReducer'
import CompositionReducer from './CompositionReducer'
import SoundReducer from './SoundReducer'

const rootReducer = combineReducers({
  UserReducer,
  CompositionReducer,
  SoundReducer 
})

export default rootReducer
