import { combineReducers } from 'redux'
import user from './user'
import feed from './feed.js'

const rootReducer = combineReducers({
  user,
  feed
})

export default rootReducer
