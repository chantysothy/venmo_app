import { combineReducers } from 'redux'
import user from './user'
import feed from './feed.js'
import charges from './charges.js'
import userSearch from './userSearch'
import phoneVerification from './phoneVerification.js'

const rootReducer = combineReducers({
  user,
  feed,
  userSearchResults: userSearch,
  charges,
  phoneVerification
})

export default rootReducer
