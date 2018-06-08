import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'
import {updateStateData} from 'actions'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      userName: '',
      password: '',
      loading: false
    }
  }
  handleSubmit() {
    if(this.state.userName == '' || this.state.password == '') {
      alert('Tên đăng nhập hoặc mật khẩu trống!');
      return false;
    }
    this.setState({
      loading: true
    });
    fetch(ISD_BASE_URL + 'token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: this.state.userName,
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((json) => {
      if(json.token) {
        sessionStorage.setItem('ISD_TOKEN', json.token);
        this.props.dispatch(updateStateData({
          showLogin: false,
          userRoles: json.scopes || [],
          userInfo: json.userInfo,
          defaultRouter: json.scopes[0] && json.scopes[0]['path'] ? json.scopes[0]['path'] : ''
        }));
      } else {
        alert.log(json.message);
        this.setState({
          loading: false
        })
      }
    })
    .catch((error) => {
      console(error);
    });
  }
  render() {
    return(
      <div className="isd-login-form">
        <div className="login-logo">
          <img src="./images/logo-pharma.png" alt="Logo"/>
        </div>
        <Form id="loginForm">
          <Form.Field>
            <label>Tên đăng nhập</label>
            <input 
              value={this.state.userName}
              onChange={(e) => {
                this.setState({userName: e.target.value})
              }}
              required 
              placeholder='Tên đăng nhập' />
          </Form.Field>
          <Form.Field>
            <label>Mật khẩu</label>
            <input 
              value={this.state.password}
              onChange={(e) => {
                this.setState({password: e.target.value})
              }}
              required 
              placeholder='Mật Khẩu' 
              type="password" />
          </Form.Field>
          <Button loading={this.state.loading} onClick={this.handleSubmit} type='button' color="violet">Đăng nhập</Button>
        </Form>
      </div>
    );
  }
}
export default LoginForm;