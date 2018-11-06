import React, { Component } from 'react';
import HeaderComponent from './components/HeaderComponent'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        { this.props.isAuthenticated ? <h2>hello { this.props.username }</h2> : null }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.user.username
})


export default connect(mapStateToProps)(App)
