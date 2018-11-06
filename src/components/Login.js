import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd'
import { login } from '../actions/users'
import { connect } from 'react-redux'

const FormItem = Form.Item

class Login extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  }
  state = {
    prevUsername: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.loading('Action in process..', 0.5).then(() => {
          const { username, password } = values
          return this.props.login({username, password})
        }).then((res) => {
          if (res.success) {
            message.loading('login success !!', 0.5).then(() => {
              localStorage.setItem('prevUsername', values.username)
              this.props.history.push('/home')
            })
          } else {
            message.error(res.message, 2.5)
            this.props.form.resetFields()
          }
        })
      }
    })
  }

  componentDidMount() {
    let prevUsername = localStorage.getItem('prevUsername')
    if (prevUsername) {
      this.setState({
        prevUsername
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login" style={{maxWidth: '400px', margin: '50px auto'}}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
            initialValue: this.state.prevUsername
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {/* Or <a href="">register now!</a> */}
        </FormItem>
      </Form>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
})

export default connect(mapStateToProps, { login })(Form.create()(Login))
