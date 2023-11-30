import axios from 'axios';
import React, { Component } from 'react';
import withRouter from '../utils/withRouter';
import MyContext from '../contexts/MyContext';
import './css/Productdetail.css'
import Footer from './FooterComponent';

class ProductDetail extends Component {
    static contextType = MyContext; // using this.context to access global state

  constructor(props) {
    super(props);
    this.state = {
      product: null,
        txtQuantity: 1

    };
  }
  render() {
    const prod = this.state.product;
    if (prod != null) {
      return (
        <div>
        <div className="product-align-center">
          <div className='product-caption-right'>
          <figure className="caption-right">
            <img src={"data:image/jpg;base64," + prod.image} width="400px" height="400px" alt="" />
            <div className='product-figcaption'>
            <figcaption>
              <form>
                <table>
                  <tbody>
                    <tr >
                      <td align="left"><h3><b>Thông tin sản phẩm:</b></h3></td>
                    </tr>
                    <tr className='tr1'>
                      <td align="left">ID:</td>
                      <td>{prod._id}</td>
                    </tr>
                    <tr>
                      <td align="left">Tên:</td>
                      <td><b>{prod.name}</b></td>
                    </tr>
                    <tr className='tr1'>
                      <td  align="left">Giá:</td>
                      <td className='tdPrice'>{(prod.price).toLocaleString('vi-VN') } VNĐ</td>
                    </tr>
                    <tr>
                      <td align="left">Loại sản phẩm:</td>
                      <td>{prod.category.name}</td>
                    </tr>
                    <tr className='tr1'>
                      <td align="left">Số lượng:</td>
                      <td><input className='product-input-number' type="number" min="1" max="99" value={this.state.txtQuantity} onChange={(e) => { this.setState({ txtQuantity: e.target.value }) }} /></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td><input className='product-submit-button' type="submit" value="Thêm vào giỏ hàng" onClick={(e) => this.btnAdd2CartClick(e)} /></td>
                    </tr>
                    <tr>
                      <td align="left">► Bảo hành chính hãng 24tháng</td>
                    </tr>
                    <tr>
                      <td align="left">► Hỗ trợ đổi mới 7 ngày</td>
                    </tr>
                    <tr>
                      <td align="left">► Miễn phí giao hàng toàn quốc</td>
                    </tr>
                    <tr>
                      <td align="left">► Trả góp 0%</td>
                    </tr>
                  </tbody>
                </table>
              </form>
            </figcaption>
            </div>
          </figure>
        </div>
        </div>
        <Footer /></div>
      );
    }
    return (<div />);
  }



  btnAdd2CartClick(e) {
    e.preventDefault();
    const product = this.state.product;
    const quantity = parseInt(this.state.txtQuantity);
    if (quantity) {
      const mycart = this.context.mycart;
      const index = mycart.findIndex(x => x.product._id === product._id); // check if the _id exists in mycart
      if (index === -1) { // not found, push newItem
        const newItem = { product: product, quantity: quantity };
        mycart.push(newItem);
      } else { // increasing the quantity
        mycart[index].quantity += quantity;
      }
      this.context.setMycart(mycart);
      localStorage.setItem('mycart', JSON.stringify(mycart));
      alert('OK BABY!');

    } else {
      alert('Please input quantity');
    }
  }
  componentDidMount() {
    const params = this.props.params;
    this.apiGetProduct(params.id);
  }
  // apis
  apiGetProduct(id) {
    axios.get('/api/customer/products/' + id).then((res) => {
      const result = res.data;
      this.setState({ product: result });
    });
  }
}
export default withRouter(ProductDetail);