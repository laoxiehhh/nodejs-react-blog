import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Button, Skeleton } from 'antd'
import { connect } from 'react-redux'
import { getArticles } from '../actions/articles'
import { Link } from 'react-router-dom'


const more = (id) => {
  return (
    <Link to={`/detail/${id}`}>more</Link>
  )
}

class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    getArticles: PropTypes.func.isRequired
  }

  state = {
    initLoading: true,
    loading: false,
  }

  componentDidMount() {
    const { getArticles } = this.props
    getArticles().then(() => {
      this.setState({
        initLoading: false
      })
    }) 
  }

  onLoadMore = () => {
    console.log(123)
  }

  render() {
    const { initLoading, loading } = this.state;
    const { articles } = this.props
    const loadMore = !initLoading && !loading ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        <Button onClick={this.onLoadMore}>loading more</Button>
      </div>
    ) : null;

    return (
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={articles}
        style={{ padding: '0 10%' }}
        renderItem={item => (
          <List.Item actions={ [more(item._id)] }>
            <Skeleton title={false} loading={item.loading} active>
              <List.Item.Meta
                title={item.title}
                description={item.body}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  articles: state.articles
})

export default connect(mapStateToProps, { getArticles })(ArticleList)
