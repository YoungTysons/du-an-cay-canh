import React from "react";
import { Link } from "react-router-dom";
import "./ThanhDieuHuong.css";

function ThanhDieuHuong({ gioHangItems }) {
  // SỬA TẠI ĐÂY: 
  // gioHangItems bây giờ là con số tổng (ví dụ: 5) truyền từ App.jsx sang
  // nên ta dùng luôn, không cần tính toán .reduce nữa.
  const tongSoLuong = Number(gioHangItems) || 0;

  return (
    <nav className="navbar-chinh">
      <div className="khung-chinh noi-dung-nav">
        {/* Logo quay về trang chủ */}
        <Link to="/" className="logo-green">🌿 GreenThumb</Link>

        {/* Các liên kết điều hướng */}
        <div className="links-dieu-huong">
          <Link to="/">Trang chủ</Link>
          <Link to="/san-pham">Sản phẩm</Link>
          <Link to="/cham-soc">Chăm sóc</Link>
          <Link to="/gio-hang">Giỏ hàng</Link> 
          <a href="#lien-he">Liên hệ</a>
        </div>

        {/* ICON GIỎ HÀNG */}
        <Link to="/gio-hang" className="gio-hang-container">
          <div className="gio-hang-icon">
            🛒 
            {tongSoLuong > 0 && (
              <span className="badge-so-luong">{tongSoLuong}</span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default ThanhDieuHuong;