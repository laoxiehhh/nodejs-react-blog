import { combineReducers } from 'redux'
import articles from './artilces'
import auth from './auth'

export default combineReducers({
  articles,
  auth
})