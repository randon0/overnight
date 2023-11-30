import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';
import './css/Navbar.css';
import MyContext from '../contexts/MyContext';


class Menu extends Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      notifications: [],
      txtKeyword: '',
      showNotifications: false,
      selectedNotification: null,
      notificationBlink: false,
    };
    this.blinkInterval = null;
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div className="navbar">
        <div className="logo-container" >
          <Link to='/'>
            <img src="/logo.png" alt="Home" className="logo-image" />
          </Link>
        </div>
        
        <div className="float-left">
          <ul className="menu respon">
            <li className="menu"><Link to='/home'>Trang chủ</Link></li>
            {cates}
          </ul>
        </div>
        <div style={{ display: "inline" }} class="form-switch" >
          <input class="form-check-input" type="checkbox" onChange={(e) => this.ckbChangeMode(e)} />&nbsp; Light / Dark
        </div>
        <div className="float-right">
          <ul className="menu">
            <li className="menu">
              <input type="search" placeholder="Bạn đang cần gì?" className="keyword" value={this.state.txtKeyword} onChange={(e) => { this.setState({ txtKeyword: e.target.value }) }} />
              <input type="submit" value="Tìm Kiếm" onClick={(e) => this.btnSearchClick(e)} />
            </li>
            {this.context.token === '' ?<li className="menu"><Link to='/login'>Đăng Nhập</Link>  <Link to='/signup'>Đăng Ký</Link> </li>:<li></li>}

            <li className="menu">
              <Link to='/mycart'> Giỏ Hàng</Link>

            </li>
          </ul>

        </div>

        <div className="float-clear" />
      </div>
    );
  }

  // event-handlers
  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  btnSearchClick = (e) => {
    e.preventDefault();
    if (this.state.txtKeyword) {
      this.props.navigate('/product/search/' + this.state.txtKeyword);
    }
    else {
      alert("Vui Lòng Nhập Thông Tin Tìm Kiếm");
    }
  };

  componentDidMount() {
    this.apiGetCategories();

  }



  apiGetCategories = () => {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  };


}

export default withRouter(Menu);
