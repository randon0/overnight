import React, { Component } from 'react';
import MyContext from '../contexts/MyContext';
import { Link } from 'react-router-dom';
import './Menu.css';




class Menu extends Component {
  static contextType = MyContext;

  lnkLogoutClick() {
    this.context.setToken('');
    this.context.setUsername('');
  }

  render() {
    return (
      <div className="border-bottom">
        <div className="float-left">
          <div class ="navbar">
            <ul className="menu">
              <li className="menu"><Link to='/admin/home'>Trang chủ</Link></li>
              <li className="menu"><Link to='/admin/category'>Danh mục</Link></li>
              <li className="menu"><Link to='/admin/notification'>Thông báo</Link></li>
              <li className="menu"><Link to='/admin/product'>Sản phẩm</Link></li>
              <li className="menu"><Link to='/admin/order'>Đặt hàng</Link></li>
              <li className="menu"><Link to='/admin/customer'>Khách hàng</Link></li>
            </ul>
          </div>
        </div>
        <div className="float-right">
          <Link to='/admin/home' onClick={() => this.lnkLogoutClick()} className="logout-link">
            <span>Đăng xuất</span>
            <i className="fas fa-sign-out-alt"></i>
          </Link>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default Menu;
