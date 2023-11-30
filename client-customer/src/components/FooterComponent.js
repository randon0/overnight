import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Footer.css'
class Footer extends Component {
  render() {

    return (
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h2>StarTech</h2>
            <p>Provide a brief description of your company or website.</p>
          </div>
          <div className="footer-section">
            <h2>Thông tin shop</h2>
            <ul>
              <li><Link to='/contactinfo'>Thông Tin Liên Hệ</Link></li>
              <li><Link to='/gmap'>Địa Chỉ SHOP</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h2>Liên hệ với chúng tôi</h2>
            {/* Add social media icons or links here */}
            <div className="social-icons">
              <ul>
              <a href="https://facebook.com"><i className="fab fa-facebook">Facebook</i></a></ul>
              <a href="https://twitter.com"><i className="fab fa-twitter">Twitter</i></a>
              {/* Add more social media icons as needed */}
            </div>
          </div>
        </div>
      </footer>
    );
  };
}
export default Footer;


