import { combineReducers } from 'redux'
import ActiveUser from './ActiveUser'
import CompositionReducer from './CompositionReducer'
import SoundReducer from './SoundReducer'

const rootReducer = combineReducers({
  ActiveUser,
  CompositionReducer,
  SoundReducer
})

export default rootReducer
