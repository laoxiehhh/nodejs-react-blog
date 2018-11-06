import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Divider, Button } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'

class DetailArticle extends Component {
  static propTypes = {
    userId: PropTypes.string.isRequired,
  }

  state = {
    title: '',
    body: '',
    author: '',
    userId: ''
  }

  componentDidMount() {
    const { match } = this.props 
    let id = match.params.id
    this.getArticleById(id)
  }

  getArticleById = (id) => {
    axios.get(`/api/articles/${id}`).then((data) => {
      let article = data.data.article
      let author = data.data.author
      const { title, body } = article
      this.setState({
        title,
        body,
        author,
        userId: article.author
      })
    })
  }

  handleEdit = () => {
    const { match } = this.props 
    let id = match.params.id
    this.props.history.push(`/edit/${id}`)    
  }

  render() {
    const { title, body, author } = this.state
    return (
      <div style={{ padding: '0 10%' }}>
        <h1>{ title }</h1>
        <h2>Written by { author }</h2>
        <p>{ body }</p>
        <Divider />
        { this.state.userId === this.props.userId ? <Button type="primary" onClick={this.handleEdit}>edit</Button> : null}
        <div>Copyright © 2018</div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  userId: state.auth.user.id || ''
})

export default connect(mapStateToProps)(DetailArticle)

