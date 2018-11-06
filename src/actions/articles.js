import { SET_ARTICLES } from '../constants/index'
import axios from 'axios'

export const setArtices = (articles) => {
  return {
    type: SET_ARTICLES,
    articles
  }
}

export const getArticles = () => {
  return (dispatch) => {
    return axios.get('/api/articles').then((data) => {
      let articles = data.data.articles
      dispatch(setArtices(articles))
    })
  }
}

// export const getArticleById = (id) => {
//   return (dispatch) => {
//     return axios.get('/api/articles/id')
//   }
// }
