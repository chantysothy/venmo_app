import { combineReducers } from 'redux'
import user from './user.js'
import feed from './feed.js'
import charges from './charges.js'
import userSearch from './userSearch'
import phoneVerification from './phoneVerification.js'
import payment from './payment.js'

const rootReducer = combineReducers({
  user,
  feed,
  userSearchResults: userSearch,
  charges,
  phoneVerification,
  payment,
})

export default rootReducer
