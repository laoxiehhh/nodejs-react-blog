import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Button, message, Modal } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'

const FormItem = Form.Item
const TextArea = Input.TextArea
class Edit extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired,
  }

  state = {
    title: '',
    body: ''
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { match } = this.props  
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { isAuthenticated } = this.props
        if (isAuthenticated) {
          this.postArticle(values)
          .then((response) => {
            if (response.data.success) {
              message.loading('Action in process..', 0.5)
                .then(() => {
                  let id = match.params.id
                  this.props.history.push(`/detail/${id}`)
                })
            }
          })
        } else {
          this.showConfirm()
        }
        
      }
    })
  }
  
  showConfirm = () => {
    const confirm = Modal.confirm
    const history = this.props.history
    confirm({
      title: 'Please login first..',
      content: 'Do you want to go login ?',
      onOk() {
        history.push('/login')
      },
      onCancel() {},
    });
  }

  postArticle = (data) => {
    const { match } = this.props
    let id = match.params.id
    return axios.put(`/api/articles/update/${id}`, data)
  }

  fetchArticl = (id) => {
    const { articles } = this.props
    return articles.filter((article) => article._id === id)[0]
  }
  
  componentDidMount() {
    const { match } = this.props
    let id = match.params.id
    let { title, body } = this.fetchArticl(id)
    this.setState({
      title,
      body
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <h1>Add Article</h1>
        <Form onSubmit={this.handleSubmit} className="login-form" id="components-form-demo-normal-login" style={{maxWidth: '400px', margin: '50px auto'}}>
          <FormItem>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input your title!' }],
              initialValue: this.state.title
            })(
              <Input placeholder="title" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('body', {
              rules: [{ required: true, message: 'Please input your content!' }],
              initialValue: this.state.body
            })(
              <TextArea autosize={{ minRows: 4 }} placeholder="Please input your content!" />
            )}
          </FormItem>
          <FormItem>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Submit
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  isAuthenticated: state.auth.isAuthenticated,
  articles: state.articles
})

export default connect(mapStateToProps)(Form.create()(Edit))


