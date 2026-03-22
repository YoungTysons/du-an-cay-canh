import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GioHang.css';

function GioHang({ gioHangItems, tongTien, thayDoiSoLuong, xoaSanPham }) {
  const navigate = useNavigate();

  return (
    <div className="gio-hang-page khung-chinh">
      <div className="cart-header">
        <h1>GIỎ HÀNG</h1>
      </div>

      {gioHangItems.length > 0 ? (
        <div className="cart-content">
          <table className="cart-table">
            <thead>
              <tr>
                <th>SẢN PHẨM</th>
                <th className="hide-mobile">GIÁ</th>
                <th>SỐ LƯỢNG</th>
                <th>TỔNG CỘNG</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {gioHangItems.map(item => (
                <tr key={item.id}>
                  <td className="product-info">
                    <img src={item.anh} alt={item.ten} />
                    <span>{item.ten}</span>
                  </td>
                  <td className="hide-mobile">{(Number(item.gia) || 0).toLocaleString()}đ</td>
                  <td>
                    <div className="quantity-control">
                      <button onClick={() => thayDoiSoLuong(item.id, -1)}>-</button>
                      <input type="text" value={item.soLuong} readOnly />
                      <button onClick={() => thayDoiSoLuong(item.id, 1)}>+</button>
                    </div>
                  </td>
                  <td className="subtotal">{((item.gia || 0) * item.soLuong).toLocaleString()}đ</td>
                  <td>
                    <button className="delete-btn" onClick={() => xoaSanPham(item.id)}>&times;</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-footer">
            <div className="total-box">
              <h3>TỔNG TIỀN: <span>{tongTien?.toLocaleString() || 0}đ</span></h3>
              <button className="btn-thanh-toan" onClick={() => navigate('/thanh-toan')}>
                THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <p>Giỏ hàng đang trống.</p>
          <button className="btn-quay-lai" onClick={() => navigate('/san-pham')}>TIẾP TỤC MUA SẮM</button>
        </div>
      )}
    </div>
  );
}
export default GioHang;