import axios from 'axios'
import { SET_CURRENT_USER } from '../constants/index'
import jwtDecode from 'jwt-decode'
import { setAuthorizationToken } from '../utils/setAuthorizationToken'

export const setCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('jwtToken')
    setAuthorizationToken(false)
    dispatch(setCurrentUser({}))
  }
}

export const login = (data) => {
  return (dispatch) => {
    return axios.post('/api/users/login', data).then((response) => {
      const { success, token = '', message = ''} = response.data
      if (success) {
        localStorage.setItem('jwtToken', token)
        setAuthorizationToken(token)
        dispatch(setCurrentUser(jwtDecode(token)))
      } else {
        dispatch(setCurrentUser({ message }))
      }
      return response.data
    })
  }
}