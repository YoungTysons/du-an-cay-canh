import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GioHang.css';

function GioHang({ gioHangItems, tongTien, thayDoiSoLuong, xoaSanPham }) {
  const navigate = useNavigate();

  return (
    <div className="gio-hang-page khung-chinh">
      <div className="cart-header">
        <h1>GIỎ HÀNG</h1>
        <div className="cart-steps">KIỂM TRA ĐƠN HÀNG CỦA BẠN</div>
      </div>

      {gioHangItems && gioHangItems.length > 0 ? (
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
              {gioHangItems.map((item) => {
                // 1. Xử lý ID linh hoạt (chấp nhận id hoặc ID)
                const itemId = item.id || item.ID;
                
                // 2. Xử lý tên và giá an toàn
                const tenHienThi = item.tenCay || item.ten || "Sản phẩm";
                const giaHienThi = Number(item.gia || 0);
                const soLuongHienThi = Number(item.soLuong || 1);
                
                // 3. Đường dẫn ảnh chuẩn từ thư mục public/images
                const anhHienThi = item.anh ? `/images/${item.anh}` : "https://via.placeholder.com/100";

                return (
                  <tr key={itemId}>
                    <td className="product-info">
                      <img 
                        src={anhHienThi} 
                        alt={tenHienThi} 
                        onError={(e) => (e.target.src = "https://via.placeholder.com/100?text=Loi+Anh")}
                      />
                      <span className="product-name">{tenHienThi}</span>
                    </td>
                    
                    <td className="hide-mobile">
                      {giaHienThi.toLocaleString()}đ
                    </td>
                    
                    <td>
                      <div className="quantity-control">
                        <button onClick={() => thayDoiSoLuong(itemId, -1)}>-</button>
                        <input type="text" value={soLuongHienThi} readOnly />
                        <button onClick={() => thayDoiSoLuong(itemId, 1)}>+</button>
                      </div>
                    </td>
                    
                    <td className="subtotal">
                      {(giaHienThi * soLuongHienThi).toLocaleString()}đ
                    </td>
                    
                    <td>
                      <button 
                        className="delete-btn" 
                        onClick={() => xoaSanPham(itemId)}
                      >
                        &times;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="cart-footer">
            <div className="total-box">
              <h3>TỔNG TIỀN: <span>{(tongTien || 0).toLocaleString()}đ</span></h3>
              <button 
                className="btn-thanh-toan" 
                onClick={() => navigate('/thanh-toan')}
              >
                TIẾN HÀNH THANH TOÁN
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <div className="empty-icon" style={{fontSize: '4rem', marginBottom: '10px'}}>🛒</div>
          <p>Giỏ hàng của bạn đang trống.</p>
          <button 
            className="btn-quay-lai" 
            onClick={() => navigate('/san-pham')}
          >
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      )}
    </div>
  );
}

 export default GioHang;