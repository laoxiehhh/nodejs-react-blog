import { SET_CURRENT_USER } from '../constants/index'

const initialState = {
  isAuthenticated: false,
  user: {}
}

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER: 
      return {
        isAuthenticated: !!(Object.keys(action.user).indexOf('username') !== -1),
        user: action.user
      }
    default: 
      return state
  }
}

export default auth