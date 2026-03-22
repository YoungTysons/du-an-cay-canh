import React, { useState } from 'react';
import './ThanhToan.css';

function ThanhToan({ gioHangItems }) {
  const [showQR, setShowQR] = useState(false);
  const subtotal = gioHangItems.reduce((acc, item) => acc + (item.gia * item.soLuong), 0);
  const shipping = 50000;
  const total = subtotal + shipping;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Sau này bạn sẽ gọi API tạo QR tại đây
    setShowQR(true); 
  };

  return (
    <div className="thanh-toan-page khung-chinh">
      <form className="thanh-toan-container" onSubmit={handlePlaceOrder}>
        
        {/* CỘT TRÁI: THÔNG TIN GIAO HÀNG */}
        <div className="thong-tin-nhan-hang">
          <h3>BILLING & SHIPPING</h3>
          <div className="form-group">
            <label>Họ và tên *</label>
            <input type="text" placeholder="Họ tên của bạn" required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Số điện thoại *</label>
              <input type="tel" placeholder="Số điện thoại" required />
            </div>
            <div className="form-group">
              <label>Địa chỉ email *</label>
              <input type="email" placeholder="Email của bạn" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Tỉnh/Thành phố *</label>
              <select required><option>Hà Nội</option><option>Hồ Chí Minh</option></select>
            </div>
            <div className="form-group">
              <label>Quận/Huyện *</label>
              <input type="text" placeholder="Quận/Huyện" required />
            </div>
          </div>
          <div className="form-group">
            <label>Địa chỉ cụ thể *</label>
            <input type="text" placeholder="Ví dụ: Số 20, ngõ 90" required />
          </div>
          
          <div className="additional-info">
            <h3>ADDITIONAL INFORMATION</h3>
            <label>Order notes (optional)</label>
            <textarea placeholder="Ghi chú về đơn hàng của bạn"></textarea>
          </div>
        </div>

        {/* CỘT PHẢI: TỔNG KẾT ĐƠN HÀNG */}
        <div className="tong-ket-don-hang">
          <div className="order-summary-box">
            <div className="summary-line">
              <span>Subtotal</span>
              <b>{subtotal.toLocaleString()}đ</b>
            </div>
            <div className="summary-line">
              <span>Shipping</span>
              <span>Giao hàng đồng giá: <b>{shipping.toLocaleString()}đ</b></span>
            </div>
            <div className="summary-line total-line">
              <span>Total</span>
              <span className="total-price">{total.toLocaleString()}đ</span>
            </div>

            <div className="payment-methods">
              <label className="method-item">
                <input type="radio" name="payment" defaultChecked />
                <span>Thanh toán Online (Chuyển khoản / QR)</span>
              </label>
              <p className="method-desc">Quét mã QR để thanh toán nhanh chóng và an toàn.</p>
              
              <label className="method-item">
                <input type="radio" name="payment" />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
            </div>

            <label className="terms">
              <input type="checkbox" required />
              <span>I have read and agree to the website terms and conditions *</span>
            </label>

            <button type="submit" className="btn-place-order">PLACE ORDER</button>
          </div>
        </div>
      </form>

      {/* POPUP QR CODE (Hiện lên khi bấm Place Order) */}
      {showQR && (
        <div className="qr-overlay" onClick={() => setShowQR(false)}>
          <div className="qr-modal" onClick={e => e.stopPropagation()}>
            <button className="close-qr" onClick={() => setShowQR(false)}>&times;</button>
            <h3>Quét mã để thanh toán</h3>
            <p>Số tiền: <b>{total.toLocaleString()}đ</b></p>
            {/* Đây là nơi bạn sẽ gắn API QR Code sau này */}
            <div className="qr-placeholder">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=ThanhToanDonHang_${total}`} alt="QR Code" />
            </div>
            <p className="qr-note">Nội dung CK: <b>GreenThumb {Math.floor(Math.random() * 10000)}</b></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThanhToan;