import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducers from './reducers/rootReducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import { setAuthorizationToken } from './utils/setAuthorizationToken'
import jwtDecode from 'jwt-decode'
import { setCurrentUser } from './actions/users'
import Routes from './routes'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const store = createStore(
  rootReducers,
  composeWithDevTools(
    applyMiddleware(thunk, logger)
  )
)

let jwtToken = localStorage.getItem('jwtToken')
if (jwtToken) {
  setAuthorizationToken(jwtToken)
  store.dispatch(setCurrentUser(jwtDecode(jwtToken)))
} 

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
        <Routes />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
