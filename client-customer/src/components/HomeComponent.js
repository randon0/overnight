import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Slider from './SliderComponent';
import MyContext from '../contexts/MyContext';
import Footer from './FooterComponent';

class Home extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      newprods: [],
      hotprods: []
    };
  }
  render() {
    const newprods = this.state.newprods.map((item) => {
      return (
        <div key={item._id} className="inline fullbox scroll-animation">
          <figure>
          <Link to={'/product/' + item._id}><img className='img' src={"data:image/jpg;base64," + item.image} width="220px" height="220px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Giá: {(item.price).toLocaleString('vi-VN')} VNĐ</figcaption>
          </figure>
        </div>
      );
    });
    const hotprods = this.state.hotprods.map((item) => {
      return (
        <div key={item._id} className="inline fullbox scroll-animation">
          <figure>
            
          <Link to={'/product/' + item._id}><img className='img' src={"data:image/jpg;base64," + item.image} width="220px" height="220px" alt="" /></Link>
            <figcaption className="text-center">{item.name}<br />Price: {(item.price).toLocaleString('vi-VN')} </figcaption>
          </figure>
        </div>
        
      );
    });
    return (
      <div>
        <div style={{marginLeft: '2%', marginRight: '2%'}}>
        <Slider/>
        </div>
        <div className="align-center">
          <h2 className="text-center">SẢN PHẨM MỚI NHẤT</h2>
          <div className='wrapper'>{newprods}</div>
          
        </div>
        {this.state.hotprods.length > 0 ?
          <div className="align-center">
            <h2 className="text-center">SẨN PHẨM HOT</h2>
            <div className='wrapper'>
            {hotprods}</div>
          </div>
          : <div />}
          <Footer />
      </div>
    );
  }
  componentDidMount() {
    this.apiGetNewProducts();
    this.apiGetHotProducts();
      const storedMycart = localStorage.getItem('mycart');
      if (storedMycart) {
        const mycart = JSON.parse(storedMycart);
        this.context.setMycart(mycart);
      }
    }
  
  // apis
  apiGetNewProducts() {
    axios.get('/api/customer/products/new').then((res) => {
      const result = res.data;
      this.setState({ newprods: result });
    });
  }
  apiGetHotProducts() {
    axios.get('/api/customer/products/hot').then((res) => {
      const result = res.data;
      this.setState({ hotprods: result });
    });
  }
}
export default Home;