import axios from 'axios'

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `bear ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}