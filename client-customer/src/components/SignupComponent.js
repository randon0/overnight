import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import './css/Signup.css'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txtUsername: '',
      txtPassword: '',
      txtName: '',
      txtPhone: '',
      txtEmail: ''
    };
  }
  render() {
    return (
      <div className="align-center">
        <div className="signup-container">
        <h2 className="text-center">Đăng Ký Thành Viên</h2>
        <form className='signup-form'>
          <table className="signup-table">
            <tbody>
              <tr>
                <td>Tên đăng nhập</td>
                <td>
                  <div className='signup-input-container'><input type="text" value={this.state.txtUsername} onChange={(e) => { this.setState({ txtUsername: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>Mật khẩu</td>
                <td><div className='signup-input-container'><input type="password" value={this.state.txtPassword} onChange={(e) => { this.setState({ txtPassword: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>Tên</td>
                <td><div className='signup-input-container'><input type="text" value={this.state.txtName} onChange={(e) => { this.setState({ txtName: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>Số điện thoại</td>
                <td><div className='signup-input-container'><input type="tel" value={this.state.txtPhone} onChange={(e) => { this.setState({ txtPhone: e.target.value }) }} /></div></td>
              </tr>
              <tr>
                <td>Email</td>
                <td><div className='signup-input-container'><input type="email" value={this.state.txtEmail} onChange={(e) => { this.setState({ txtEmail: e.target.value }) }} /></div></td>
              </tr>
               <tr>
                <td></td>
                <td>
                  <input className='signup-submit-button' type="submit" value="Đăng Ký" onClick={(e) => this.btnSignupClick(e)} />
                  <span style={{ marginLeft: '10px' }}>
                    <button className='signup-link-button' type="button" onClick={(e) => this.btnActiveClick(e)}>Xác Thực</button>
                  </span>
                </td>
              </tr>
             
            </tbody>
          </table>
        </form>
      </div>
    </div>
    );
  }

  btnActiveClick(e) {
    e.preventDefault();
    // Add logic to handle the reset password action
    // You can navigate to the reset password page or show a modal, etc.
    // For example:
    this.props.navigate('/active');
  }

  // event-handlers
  btnSignupClick(e) {
    e.preventDefault();
    const username = this.state.txtUsername;
    const password = this.state.txtPassword;
    const name = this.state.txtName;
    const phone = this.state.txtPhone;
    const email = this.state.txtEmail;
    if (username && password && name && phone && email) {
      const account = { username: username, password: password, name: name, phone: phone, email: email };
      this.apiSignup(account);
    } else {
      alert('Xin hãy nhập đầy đủ thông tin');
    }
  }
  // apis
  apiSignup(account) {
    axios.post('/api/customer/signup', account).then((res) => {
      const result = res.data;
      alert(result.message);
      this.props.navigate('/active');

    });
  }
}
export default withRouter(Signup);