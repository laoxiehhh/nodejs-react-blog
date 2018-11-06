import ArticleList from './components/ArticleList'
import { Switch, Route } from 'react-router-dom'

import React from 'react'
import DetailArticle from './components/detail'
import Register from './components/Register'
import Login from './components/Login'
import Edit from './components/edit'
import AddArticle from './components/addArticle';

function Routes() {
  return (
    <Switch>
      <Route exact path='/' component={ArticleList}/>   
      <Route path='/home' component={ArticleList}/>
      <Route path='/detail/:id' component={DetailArticle}/>
      <Route path='/register' component={Register}/>
      <Route path='/login' component={Login}/>
      <Route path='/edit/:id' component={Edit}/>
      <Route path='/addAricle' component={AddArticle}/>
      
    </Switch>
  )
}

export default Routes
