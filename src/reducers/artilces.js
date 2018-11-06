import { SET_ARTICLES } from '../constants/index'

const articles = (state = [], action = {}) => {
  switch (action.type) {
    case SET_ARTICLES: 
      return action.articles
    default: 
      return state
  }
}

export default articles