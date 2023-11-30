import axios from 'axios';
import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';


class NotificationDetail extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      txtID: '',
      txtName: ''
    };
  }
  render() {
    return (
      <div className="container">
        <h2 className="text-center">Danh sách thông báo</h2>
        <form>
          <div className="form-group">
            <label htmlFor="txtID" className="label">Mã</label>
            <input
              type="text"
              id="txtID"
              value={this.state.txtID}
              onChange={(e) => this.setState({ txtID: e.target.value })}
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="txtName" className="label">Tên</label>
            <input
              type="text"
              id="txtName"
              value={this.state.txtName}
              onChange={(e) => this.setState({ txtName: e.target.value })}
            />
          </div>
          <div className="button-group">
            <input type="submit" value="Thêm mới" onClick={(e) => this.btnAddClick(e)} />
            <input type="submit" value="Cập nhật" onClick={(e) => this.btnUpdateClick(e)} />
            <input type="submit" value="Xóa" onClick={(e) => this.btnDeleteClick(e)} />
          </div>
        </form>
      </div>
    );
  }
   // event-handlers
   btnUpdateClick(e) {
    e.preventDefault();
    const id = this.state.txtID;
    const name = this.state.txtName;
    if (id && name) {
      const cate = { name: name };
      this.apiPutNotification(id, cate);
    } else {
      alert('Vui lòng nhập mã và tên');
    }
  }
  // apis
  apiPutNotification(id, cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.put('/api/admin/notifications/' + id, cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công!');
        this.apiGetNotifications();
      } else {
        alert('Thêm thất bại!');
      }
    });
  }
   // event-handlers
   btnDeleteClick(e) {
    e.preventDefault();
    if (window.confirm('Bạn có chắc không')) {
      const id = this.state.txtID;
      if (id) {
        this.apiDeleteNotification(id);
      } else {
        alert('Vui lòng nhập mã');
      }
    }
  }
  // apis
  apiDeleteNotification(id) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.delete('/api/admin/notifications/' + id, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Xóa thành công!');
        this.apiGetNotifications();
      } else {
        alert('Xóa thất bại!');
      }
    });
  }
  btnAddClick(e) {
    e.preventDefault();
    const name = this.state.txtName;
    if (name) {
      const cate = { name: name };
      this.apiPostNotification(cate);
    } else {
      alert('Vui lòng nhập tên');
    }
  }
  // apis
  apiPostNotification(cate) {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.post('/api/admin/notifications', cate, config).then((res) => {
      const result = res.data;
      if (result) {
        alert('Thêm thành công!');
        this.apiGetNotifications();
      } else {
        alert('Thêm thất bại!');
      }
    });
  }
  apiGetNotifications() {
    const config = { headers: { 'x-access-token': this.context.token } };
    axios.get('/api/admin/notifications', config).then((res) => {
      const result = res.data;
      this.props.updateNotifications(result);
    });
  }
  componentDidUpdate(prevProps) {
    if (this.props.item !== prevProps.item) {
      this.setState({ txtID: this.props.item._id, txtName: this.props.item.name });
    }
  }
}
export default NotificationDetail;