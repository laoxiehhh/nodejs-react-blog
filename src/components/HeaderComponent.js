import React, { Component } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/users'
import PropTypes from 'prop-types'

const { Header } = Layout

class HeaderComponent extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
  }
  handleLogout = () => {
    this.props.logout()   
  }
  render() {
    const { isAuthenticated } = this.props
    const hasLogin = (
      <Menu.Item onClick={this.handleLogout} style={{ float: 'right' }}>logout</Menu.Item>
    )
    
    return (
      <Layout className="layout">
        <Header style={{padding: '0 20%'}}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Xxd's blog</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/home">Home</Link></Menu.Item>
            { isAuthenticated ? <Menu.Item><Link to="/addAricle">addArticle</Link></Menu.Item> : null}
            { isAuthenticated ? hasLogin : null }
            { isAuthenticated ? null : <Menu.Item key="4" style={{ float: 'right' }}><Link to="/login">Login</Link></Menu.Item> }
            { isAuthenticated ? null : <Menu.Item key="5" style={{ float: 'right' }}><Link to="/register">Register</Link></Menu.Item> }
          </Menu>
        </Header>
      </Layout>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username
})

export default connect(mapStateToProps, { logout })(HeaderComponent)

