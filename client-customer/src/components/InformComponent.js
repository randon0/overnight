import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MyContext from '../contexts/MyContext';

class Inform extends Component {
  static contextType = MyContext;

  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      showLinks: false,
      notificationBlink: false,
      showNotifications: false,
    };
  }

  componentDidMount() {
    console.log('Component Inform đã được lắp đặt');
    this.apiGetNotifications();

    // Kiểm tra xem có thông tin đăng nhập trong sessionStorage không
    const storedToken = sessionStorage.getItem('token');
    const storedCustomer = sessionStorage.getItem('customer');

    if (storedToken && storedCustomer) {
      this.context.setToken(storedToken);
      this.context.setCustomer(JSON.parse(storedCustomer));
    }

    // Bắt đầu nhấp nháy khi component được mount
    this.blinkInterval = setInterval(() => {
      this.setState((prevState) => ({
        notificationBlink: !prevState.notificationBlink,
      }));
    }, 1000); // 1 giây
  }

  componentWillUnmount() {
    console.log('Component Inform đã bị hủy lắp đặt');
    // Hủy đăng ký interval khi component unmount
    clearInterval(this.blinkInterval);
  }

  apiGetNotifications = () => {
    axios.get('/api/customer/notifications').then((res) => {
      const result = res.data;
      this.setState({ notifications: result });
    });
  };

  render() {
    console.log('Trạng thái:', this.state);
    console.log('Ngữ cảnh:', this.context);
    return (
      <div className="border-bottom">
        <>
          <div className="float-left">
            {this.context.token === '' ? (
              <div></div>
            ) : (
              <div
                className="profile-container"
                onMouseEnter={() => this.toggleLinks(true)}
                onMouseLeave={() => this.toggleLinks(false)}
              >
                <div className="profile-info">
                  Xin Chào <b>{this.context.customer.name} </b> |
                </div>
                {this.state.showLinks && (
                  <div className="profile-links hover-effect">
                    <Link to='/myprofile'>Thông Tin Cá Nhân</Link>
                    <Link to='/myorders'>Đơn Hàng Đã Đặt</Link>
                    <Link to='/home' onClick={() => this.lnkLogoutClick()}>
                      Đăng Xuất
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="float-right">
            {this.state.notifications.length > 0 && (
              <span className={`cart__num c-whi f-thin c-red${this.state.notificationBlink ? ' blink' : ''}`}>
                Có {this.state.notifications.length}{' '}
                <span className={`notification-icon${this.state.notifications.length > 0 ? ' with-notification' : ''}`} onClick={this.toggleNotifications}>
                  🛎️
                </span>{' '}
                Thông Báo
              </span>
            )}
            {this.state.showNotifications && (
              <div className="notifications-container right-positioned">
                {this.state.notifications.map((item) => (
                  <div key={item._id} className={'notification-item'}>
                    <span onClick={() => this.selectNotification(item)}>{item.name}</span>
                  </div>
                ))}
              </div>
            )}

          </div>
        </>

        <div className="float-clear" />
      </div>
    );
  }

  lnkLogoutClick() {
    // Xóa thông tin đăng nhập khỏi sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('customer');

    this.context.setToken('');
    this.context.setCustomer(null);
    this.context.setMycart([]);
    localStorage.removeItem('mycart'); // Xóa giỏ hàng khỏi local storage
  }

  toggleLinks(show) {
    this.setState({ showLinks: show });
  }

  toggleNotifications = () => {
    this.setState((prevState) => ({
      showNotifications: !prevState.showNotifications,
      notificationBlink: false,
    }));
  };
  apiGetNotifications = () => {
    axios.get('/api/customer/notifications')
      .then((res) => {
        const result = res.data;
        console.log(result); // Log kết quả để kiểm tra xem nó có đang lấy dữ liệu đúng cách không
        this.setState({ notifications: result });
      })
      .catch((error) => {
        console.error('Lỗi khi lấy thông báo:', error);
      });
      
  };
  selectNotification = (notification) => {
    this.setState({ selectedNotification: notification });
    // Thực hiện các hành động khác khi một thông báo được chọn
  };
}

export default Inform;
